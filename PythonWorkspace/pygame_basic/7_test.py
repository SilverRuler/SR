import pygame

pygame.init() # must

# 화면 크기
screen_width = 480
screen_height = 640
screen = pygame.display.set_mode((screen_width, screen_height))

# 화면 타이틀
pygame.display.set_caption("Silver Game")

# FPS
clock = pygame.time.Clock()


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

# 이동 속도
character_speed = 0.6

# enemy
enemy = pygame.image.load("C:/Users/master1/Desktop/PythonWorkspace/pygame_basic/enemy.png")
enemy_size = enemy.get_rect().size # 이미지 크기 구해옴
enemy_width = enemy_size[0] # 가로크기
enemy_height = enemy_size[1] # 세로크기
enemy_x_pos = screen_width / 2 - enemy_width /2 # 화면 가로의 절반크기에 해당하는 위치
enemy_y_pos = screen_height /2 - enemy_height /2 # 화면 세로크기 가장 아래 


# 폰트 정의
game_font = pygame.font.Font(None, 40) # 폰트 객체 생성

# 총 시간 
total_time = 10

# 시작 시간 정보
start_ticks = pygame.time.get_ticks() # 시작 틱 정보 받아옴



# event loop
running = True # 게임 진행중

while running : 
    dt = clock.tick(60) # 게임화면의 초당 프레임 수

# 캐릭터가 1초 동안 100만큼 이동 해야함
# 10 fps : 1초 동안에 10번 동작 -> 1번에 몇 만큼 이동 ? 10만큼 10 * 10 100
# 20 fps : 1초 동안에 20번 동작 -> 1번에 몇 만큼 이동 ? 5만큼 5 * 20 100


    print("fps : " + str(clock.get_fps()))

    for event in pygame.event.get(): # 어떤 이벤트가 발생하였는가
        if event.type == pygame.QUIT : #창 x표시
            running = False 
        
        if event.type == pygame.KEYDOWN: #키 눌러지면
            if event.key == pygame.K_LEFT :
                to_x -= character_speed
            elif event.key == pygame.K_RIGHT :
                to_x += character_speed
            elif event.key == pygame.K_UP :
                to_y -= character_speed
            elif event.key == pygame.K_DOWN :
                to_y += character_speed
        
        if event.type == pygame.KEYUP : #방향키 떼면멈춤
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT :
                to_x =0
            elif event.key == pygame.K_UP or event.key == pygame.K_DOWN :
                to_y = 0
    
    character_x_pos += to_x * dt
    character_y_pos += to_y * dt

# 경곗값 처리
    if character_x_pos < 0 :
        character_x_pos = 0
    elif character_x_pos > screen_width - character_width :
        character_x_pos = screen_width - character_width

    if character_y_pos < 0:
        character_y_pos = 0
    elif character_y_pos > screen_height - character_height :
        character_y_pos = screen_height - character_height
        

    # 충돌 처리

    character_rect = character.get_rect()
    character_rect.left = character_x_pos
    character_rect.top = character_y_pos

    enemy_rect = enemy.get_rect()
    enemy_rect.left = enemy_x_pos
    enemy_rect.top = enemy_y_pos

    # 충돌 체크
    if character_rect.colliderect(enemy_rect):
        print("충돌했어요")
        running = False

    
    

    screen.blit(background,(0,0)) # 배경 그리기
    screen.blit(character, (character_x_pos, character_y_pos))
    screen.blit(enemy, (enemy_x_pos, enemy_y_pos))

    #타이머 집어넣기
    # #경과 시간 계산
    elapsed_time = (pygame.time.get_ticks() - start_ticks) / 1000 # 밀리세컨 경과시간

    timer = game_font.render(str(int(total_time - elapsed_time)), True, (255,255,255))
    # 출력할 글자, 트루, 글자 색상


    screen.blit(timer, (20,20))

    # 시간 0 이면 종료
    if total_time - elapsed_time <= 0:
        print("타임아웃")
        running = False

    pygame.display.update() # 게임 화면을 다시 그리기

# 잠시 대기
pygame.time.delay(2000) # 2초 정도 대기

# pygame 종료 처리
pygame.quit()
