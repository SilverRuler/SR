import time
from PIL import ImageGrab

time.sleep(5) # 5대기

for i in range(1,11):
    img = ImageGrab.grab() # 현재 스크린 이미지를 가져옴
    img.save("image{}.png".format(i)) # 파일로 저장 1~ 10 .png
    time.sleep(2)