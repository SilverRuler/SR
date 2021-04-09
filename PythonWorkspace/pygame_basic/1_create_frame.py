import pygame

pygame.init() # must

# 화면 크기
screen_width = 480
screen_height = 640
screen = pygame.display.set_mode((screen_width, screen_height))

# 화면 타이틀
pygame.display.set_caption("Silver Game")

# event loop

running = True # 게임 진행중

while running : 
    for event in pygame.event.get(): # 어떤 이벤트가 발생하였는가
        if event.type == pygame.QUIT : #창 x표시
            running = False 

# pygame 종료 처리
pygame.quit()