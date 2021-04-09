import pygame

pygame.init() # must

# 화면 크기
screen_width = 480
screen_height = 640
screen = pygame.display.set_mode((screen_width, screen_height))

# 화면 타이틀
pygame.display.set_caption("Silver Game")

# 배경이미지 로드
background = pygame.image.load("C:/Users/master1/Desktop/PythonWorkspace/pygame_basic/background.png")

# 스프라이트 로드
character = pygame.image.load("C:/Users/master1/Desktop/PythonWorkspace/pygame_basic/character.png")
character_size = character.get_rect().size # 이미지 크기 구해옴
character_width = character_size[0] # 가로크기
character_height = character_size[1] # 세로크기
character_x_pos = screen_width / 2 - character_width /2 # 화면 가로의 절반크기에 해당하는 위치
character_y_pos = screen_height - character_height # 화면 세로크기 가장 아래 

# 이동할 좌표
to_x = 0
to_y = 0


# event loop
running = True # 게임 진행중

while running : 
    for event in pygame.event.get(): # 어떤 이벤트가 발생하였는가
        if event.type == pygame.QUIT : #창 x표시
            running = False 
        
        if event.type == pygame.KEYDOWN: #키 눌러지면
            if event.key == pygame.K_LEFT :
                to_x -= 5
            elif event.key == pygame.K_RIGHT :
                to_x += 5
            elif event.key == pygame.K_UP :
                to_y -= 5
            elif event.key == pygame.K_DOWN :
                to_y += 5
        
        if event.type == pygame.KEYUP : #방향키 떼면멈춤
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT :
                to_x =0
            elif event.key == pygame.K_UP or event.key == pygame.K_DOWN :
                to_y = 0
    
    character_x_pos += to_x
    character_y_pos += to_y

# 경곗값 처리
    if character_x_pos < 0 :
        character_x_pos = 0
    elif character_x_pos > screen_width - character_width :
        character_x_pos = screen_width - character_width

    if character_y_pos < 0:
        character_y_pos = 0
    elif character_y_pos > screen_height - character_height :
        character_y_pos = screen_height - character_height
        
    screen.blit(background,(0,0)) # 배경 그리기
    screen.blit(character, (character_x_pos, character_y_pos))

    pygame.display.update() # 게임 화면을 다시 그리기

# pygame 종료 처리
pygame.quit()
