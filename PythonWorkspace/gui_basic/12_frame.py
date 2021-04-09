from tkinter import *

root = Tk()
root.title("Silver GUI")
root.geometry("640x480") # 크기

Label(root, text="메뉴를 선택해 주세요").pack(side="top")

Button(root, text="주문하기").pack(side="bottom")

frame_burger = Frame(root, relief = "solid", bd=1)
frame_burger.pack(side = "left", fill = "both",expand=True)

#
Button(frame_burger, text= "햄버거").pack()
Button(frame_burger, text= "ㅊㅈ버거").pack()
Button(frame_burger, text= "ㅊㅋ버거").pack()


#
frame_drink = LabelFrame(root, text="음료")
Button(frame_drink, text= "콜라").pack()
Button(frame_drink, text= "사이다").pack()
frame_drink.pack(side="right",fill = "both",expand=True)

root.mainloop()