import tkinter.messagebox as msgbox
from tkinter import *

root = Tk()
root.title("Silver GUI")
root.geometry("640x480") # 크기

# 기차 예매
def info():
    msgbox.showinfo("알림", "정상적으로 예매 완료")

def warn():
    msgbox.showwarning("경고", "매진")

def error():
    msgbox.showerror("에러", "결제 오류")

def okcancel():
    msgbox.askokcancel("확인취소", "해당 좌석은 유아 동반석 예매 ?")

def retrycancel():
    response = msgbox.askretrycancel("재시도취소", "일시적인 오류 다시 시도 ?")
    if response == 1:
        print("재시도")
    elif response == 0: 
        print("취소")

def yesno():
    msgbox.askyesno("예 / 아니오", "해당 좌석은 역방향임 ㄱ?")

def yesnocancel():
    response = msgbox.askyesnocancel(title = None, message = "예매 내역이 저장되지 않았습니다.\n저장후 프로그램을 종료?")
# 네 저장후 종료
# 아니오 저장 x 종료
# 취소 프로그램종료취소
    print("응답:",response)
    if response == 1:
        print("예")
    elif response == 0:
        print("no")
    else :
        print("cancel")


Button(root, command = info, text = "알림").pack()
Button(root, command = warn, text = "경고").pack()
Button(root, command = error, text = "에러").pack()

Button(root, command = okcancel, text = "확인취소").pack()
Button(root, command = retrycancel, text = "재시도 취소").pack()
Button(root, command = yesno, text = "예 아니오").pack()
Button(root, command = yesnocancel, text = "예 아니오 취소").pack()

root.mainloop()