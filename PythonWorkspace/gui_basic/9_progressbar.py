import time
import tkinter.ttk as ttk
from tkinter import *


root = Tk()
root.title("Silver GUI")
root.geometry("640x480") # 크기

# # progressbar = ttk.Progressbar(root, maximum = 100, mode = "indeterminate") #인디터미네이트 언제끝날지모름
# progressbar = ttk.Progressbar(root, maximum = 100, mode = "determinate") 
# progressbar.start(10) # 10 ms 마다 움직임
# progressbar.pack()



# def btncmd():
#     progressbar.stop() 



# btn = Button(root, text = "중지", command = btncmd)
# btn.pack()

p_var2 = DoubleVar()
progressbar2 = ttk.Progressbar(root, maximum = 100, length = 150, variable = p_var2)
progressbar2.pack()

def btncmd2():
    for i in range(1, 101) :
        time.sleep(0.01) # 0.01초

        p_var2.set(i) # 프로그레스바의 값을 설정
        progressbar2.update() # ui 업데이트
        print(p_var2.get())

btn = Button(root, text = "시작", command = btncmd2)
btn.pack()

root.mainloop()