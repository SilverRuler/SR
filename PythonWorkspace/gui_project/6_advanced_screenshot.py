import keyboard
from PIL import ImageGrab
import time

def screenshot():
    # _20200601_102030
    curr_time = time.strftime("_%Y%m%d_%H%M%S")
    img = ImageGrab.grab()
    img.save("image{}.png".format(curr_time)) #imgae_20200601_102030.png

keyboard.add_hotkey("F9",screenshot) # 사용자가 F9 키를 누르면 스크린샷 저장
#keyboard.add_hotkey("a",screenshot)
#keyboard.add_hotkey("ctrl+shift+s",screenshot)


keyboard.wait("esc") # 사용자가 esc를 누를떄까지 프로그램 수행
