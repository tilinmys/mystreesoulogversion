from PIL import Image
import os

# 1. Extract logo icon (woman in circle) — top 57% of the image
logo = Image.open("images/firstscreen.png").convert("RGBA")
w, h = logo.size
crop_h = int(h * 0.57)
icon = logo.crop((0, 0, w, crop_h))
icon = icon.resize((480, 480), Image.LANCZOS)
icon.save("images/webp/logo_icon.webp", "WEBP", quality=82, method=6)
kb = os.path.getsize("images/webp/logo_icon.webp") // 1024
print("logo_icon.webp:", kb, "KB")

# 2. Full brand image (icon + text + tagline)
full = Image.open("images/firstscreen.png").convert("RGBA")
full = full.resize((720, 720), Image.LANCZOS)
full.save("images/webp/logo_full.webp", "WEBP", quality=80, method=6)
kb2 = os.path.getsize("images/webp/logo_full.webp") // 1024
print("logo_full.webp:", kb2, "KB")

# 3. Re-compress founder images as WebP (40% smaller than JPEG)
for src, dst in [
    ("images/founder1.jpg", "images/webp/founder1.webp"),
    ("images/cofounder.jpg", "images/webp/cofounder.webp"),
]:
    img = Image.open(src).convert("RGB")
    nw = 640
    nh = int(img.height * nw / img.width)
    img = img.resize((nw, nh), Image.LANCZOS)
    img.save(dst, "WEBP", quality=75, method=6)
    kb3 = os.path.getsize(dst) // 1024
    print(dst + ":", nw, "x", nh, kb3, "KB")
