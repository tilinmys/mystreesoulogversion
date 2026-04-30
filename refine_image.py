import os
import argparse
from PIL import Image, ImageEnhance, ImageFilter

def refine_image(input_path, output_path):
    print(f"Refining {input_path}...")
    try:
        with Image.open(input_path) as img:
            # 1. Enhance Color (Saturation)
            # Boosts the color to make pastel/warm colors pop more beautifully
            color_enhancer = ImageEnhance.Color(img)
            img = color_enhancer.enhance(1.15) 

            # 2. Enhance Contrast
            # Improves depth by slightly boosting the contrast
            contrast_enhancer = ImageEnhance.Contrast(img)
            img = contrast_enhancer.enhance(1.08) 

            # 3. Enhance Sharpness (Unsharp Mask algorithm)
            # This is the classic algorithm used in Photoshop to make blurry edges incredibly crisp
            # We apply it carefully to avoid artifacts
            img = img.filter(ImageFilter.UnsharpMask(radius=2.0, percent=130, threshold=3))

            # Optional: Resize/downsample if needed (not active, but here for reference)
            # img.thumbnail((1024, 1024), Image.Resampling.LANCZOS)

            # Save the refined image
            img.save(output_path, quality=98)
            print(f"SUCCESS: Image refined successfully using Unsharp Mask & Color Algorithms!")
            print(f"SUCCESS: Saved perfectly clear image to: {output_path}")
            
    except Exception as e:
        print(f"ERROR: Error refining image: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Image Refinement & Super-Clear Algorithm")
    parser.add_argument("-i", "--input", required=True, help="Path to your original uploaded image")
    parser.add_argument("-o", "--output", required=True, help="Path to save the super-clear refined image")
    
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"⚠️  Could not find image at {args.input}")
    else:
        refine_image(args.input, args.output)
