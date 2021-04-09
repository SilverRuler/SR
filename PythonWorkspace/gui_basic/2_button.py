from tkinter import *

root = Tk()
root.title("Silver GUI")

btn1 = Button(root, text = "버튼1")
btn1.pack() #버튼호출

btn2 = Button(root, padx=5, pady=10, text = "버튼22222222")
btn2.pack()

btn3 = Button(root, padx=10, pady=5, text = "버튼3")
btn3.pack()

btn4 = Button(root, width=10, height=3, text= "버튼4333333333")
btn4.pack()

btn5 = Button(root, fg="red", bg="yellow", text = "버튼5")
btn5.pack()

photo = PhotoImage(file = "gui_basic/image.png")
btn6 = Button(root, image=photo)
btn6.pack()

def btncmd():
    print("버튼이 클릭되었습니다")

btn7 = Button(root, text= "동작하는 버튼", command = btncmd)
btn7.pack()


root.mainloop()