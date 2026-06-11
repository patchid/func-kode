from PIL import Image
import numpy as np

# Load images
raccoon = Image.open("public/raccoon.png").convert("RGB")
logo_dark = Image.open("public/logo-dark-extracted.png").convert("RGB")
logo_light = Image.open("public/logo-light-extracted.png").convert("RGB")

print(f"Raccoon dimensions: {raccoon.size}")
print(f"Logo dark dimensions: {logo_dark.size}")
print(f"Logo light dimensions: {logo_light.size}")

# Resize raccoon to logo_dark size and calculate difference
raccoon_resized_dark = raccoon.resize(logo_dark.size)
diff_dark = np.abs(np.array(raccoon_resized_dark, dtype=np.int32) - np.array(logo_dark, dtype=np.int32))
mean_diff_dark = np.mean(diff_dark)
print(f"Mean pixel difference (Raccoon resized vs Logo Dark): {mean_diff_dark}")

# Resize raccoon to logo_light size and calculate difference
raccoon_resized_light = raccoon.resize(logo_light.size)
diff_light = np.abs(np.array(raccoon_resized_light, dtype=np.int32) - np.array(logo_light, dtype=np.int32))
mean_diff_light = np.mean(diff_light)
print(f"Mean pixel difference (Raccoon resized vs Logo Light): {mean_diff_light}")
