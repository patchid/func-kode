from PIL import Image

def image_to_ascii(image_path, width=40):
    try:
        img = Image.open(image_path)
        # Convert to grayscale
        img = img.convert('L')
        # Resize preserving aspect ratio
        aspect_ratio = img.height / img.width
        height = int(width * aspect_ratio * 0.5) # 0.5 accounts for vertical font spacing
        img = img.resize((width, height))
        
        # ASCII characters from dark to light
        chars = "@%#*+=-:. "
        ascii_str = ""
        for y in range(img.height):
            for x in range(img.width):
                gray = img.getpixel((x, y))
                char_idx = int(gray / 256 * len(chars))
                ascii_str += chars[char_idx]
            ascii_str += "\n"
        return ascii_str
    except Exception as e:
        return str(e)

print("=== RACCOON.PNG ===")
print(image_to_ascii("public/raccoon.png", width=40))

print("=== LOGO-DARK-EXTRACTED.PNG ===")
print(image_to_ascii("public/logo-dark-extracted.png", width=40))

print("=== LOGO-LIGHT-EXTRACTED.PNG ===")
print(image_to_ascii("public/logo-light-extracted.png", width=40))
