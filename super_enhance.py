import os
import argparse
from PIL import Image, ImageEnhance, ImageFilter

try:
    from rembg import remove
except ImportError:
    print("ERROR: 'rembg' is not installed. Please run: pip install rembg[cli]")
    exit(1)

def make_hd(img):
    """Applies algorithms to make the image crisp, vibrant, and HD"""
    # 1. Enhance Color
    color_enhancer = ImageEnhance.Color(img)
    img = color_enhancer.enhance(1.15)
    
    # 2. Enhance Contrast
    contrast_enhancer = ImageEnhance.Contrast(img)
    img = contrast_enhancer.enhance(1.08)
    
    # 3. Enhance Sharpness (Unsharp Mask algorithm)
    img = img.filter(ImageFilter.UnsharpMask(radius=2.0, percent=150, threshold=3))
    
    return img

def process_image(input_path, output_path):
    print(f"\nProcessing: {input_path}")
    try:
        # Load image
        with Image.open(input_path) as img:
            # 1. AI Background Removal
            print("--> Removing background using AI...")
            img_no_bg = remove(img)
            
            # 2. Make it HD
            print("--> Applying HD enhancements...")
            img_hd = make_hd(img_no_bg)
            
            # 3. Save as PNG to preserve transparency
            img_hd.save(output_path, "PNG")
            print(f"SUCCESS: Saved HD transparent image to {output_path}")
            
    except Exception as e:
        print(f"ERROR: Failed to process {input_path}: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Background Removal & HD Enhancement")
    parser.add_argument("-i", "--input", required=True, help="Path to input image or folder")
    parser.add_argument("-o", "--output", required=True, help="Path to output image or folder")
    
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"ERROR: Could not find path {args.input}")
    elif os.path.isfile(args.input):
        # Ensure output directory exists if output is a path like folders/file.png
        out_dir = os.path.dirname(args.output)
        if out_dir and not os.path.exists(out_dir):
            os.makedirs(out_dir)
        process_image(args.input, args.output)
    elif os.path.isdir(args.input):
        if not os.path.exists(args.output):
            os.makedirs(args.output)
        for filename in os.listdir(args.input):
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                in_path = os.path.join(args.input, filename)
                out_path = os.path.join(args.output, f"{os.path.splitext(filename)[0]}_hd.png")
                process_image(in_path, out_path)
