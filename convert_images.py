import os
import argparse
from PIL import Image

def convert_to_webp(input_dir, output_dir, quality=80):
    """
    Converts images from the input directory to highly optimized WebP format
    and saves them in the output directory.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    valid_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.tiff')
    converted_count = 0

    print(f"Scanning '{input_dir}' for images...")
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(valid_extensions):
            input_path = os.path.join(input_dir, filename)
            name_without_ext = os.path.splitext(filename)[0]
            output_path = os.path.join(output_dir, f"{name_without_ext}.webp")
            
            try:
                with Image.open(input_path) as img:
                    # WebP fully supports transparency (RGBA), so we just save it directly!
                    img.save(output_path, 'WEBP', quality=quality)
                
                # Compare file sizes just to show the magic!
                original_size = os.path.getsize(input_path) / 1024
                new_size = os.path.getsize(output_path) / 1024
                savings = (1 - (new_size / original_size)) * 100
                
                print(f"✅ {filename} -> {name_without_ext}.webp (-{savings:.1f}%)")
                converted_count += 1
            except Exception as e:
                print(f"❌ Failed to convert {filename}: {e}")

    print(f"\n🎉 Successfully converted {converted_count} images to WebP!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Optimize images to super-fast WebP format.")
    parser.add_argument("-i", "--input", default="assets/images", help="Folder containing your heavy images")
    parser.add_argument("-o", "--output", default="assets/optimized", help="Folder to save the super-fast WebP images")
    parser.add_argument("-q", "--quality", type=int, default=85, help="Compression quality (0-100, default: 85)")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input):
        print(f"⚠️  Input directory '{args.input}' not found. Please create it or pass a valid path.")
    else:
        convert_to_webp(args.input, args.output, args.quality)
