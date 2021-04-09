from tkinter import *

root = Tk()
root.title("Silver GUI")
root.geometry("640x480") # 크기


txt = Text(root, width = 30, height =5)
txt.pack()

txt.insert(END, "글자를 입력하세요")

e = Entry(root, width=30) # 엔터 불가, 한줄로 받을때
e.pack()
e.insert(0, "한 줄만 입력해요")

def btncmd():
    #내용 출력
    print(txt.get("1.0", END)) # 1번쨰 줄, 0번 컬럼부터 가져온다. ~ 끝까지
    print(e.get())

    #내용 삭제
    txt.delete("1.0", END)
    e.delete(0,END)

btn = Button(root, text = "클릭", command = btncmd)
btn.pack()

root.mainloop()