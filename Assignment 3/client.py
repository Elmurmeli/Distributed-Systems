import socket
import threading

#Used Geeks for geeks as a reference for the base of this application:
#https://www.geeksforgeeks.org/simple-chat-room-using-python/
#Also used socket and threading documentation from the python website:
#https://docs.python.org/3.9/library/socket.html
#https://docs.python.org/3.9/library/threading.html


class ChatClient:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.connect((self.host, self.port))
        self.nickname = None
        self.channel = None

    
    def receive(self):
        #Loop for receiving client requests
        while True:
            try:
                message = self.sock.recv(1024).decode('ascii')
                if message == 'Nickname chosen successfully!':
                    self.sock.send(self.nickname.encode('ascii'))
                elif message =='CHANNEL':
                    channel = message.split()[1]
                    print(f'You joined channel {channel}')
                    self.channel = channel

                else:
                    print(message)
            except:
                print('Disconnecting...')
                self.sock.close()
                break
        
    def send_message(self):
        #Instructions for the user
        print("\nHello! Welcome to the chat room!\
            \nYou are connected to 'Channel1'\
            \nTo Join different channel, use '/join <Channel>'\
            \nTo Chat with others, just type in the console\
            \nTo Send private message, use '/msg <nickname> <message>'\
            \nTo disconnect from the server, use '/quit'\n")
        channel = "Channel1"
        self.channel = channel
        #Continuous while loop for sending messages
        while True:
            message = input()
            #Check if the user inputs /join to join different channel
            if message.startswith('/join '):
                channel = message.split()[1]
                #Send message to everyone that the user joined channel
                self.sock.send(f'{self.nickname} joined {channel}'.encode('ascii'))
                self.channel = channel
            #Check if user inputs /quit and if so, disconnect the user using disconnect function.
            if message.lower() == '/quit':
                self.disconnect()
                break
            # Private message
            if message.startswith('/msg'):
                args = message.split(" ")
                if len(args) < 2:
                    self.send("Usage: /msg <nickname> <message>")
                else:
                    message = " ".join(args[1:])
                    self.sock.send(f"[PM from {self.nickname}] {message}".encode())
            else:
                #Checks if the user is in any channel
                if self.channel == channel:
                    self.sock.sendall(f'\n{self.nickname}[{self.channel}]: {message}'.encode('ascii'))
                else:
                    print("Not in any channel.")
                    

    #Disconnects the user from the server and closes the connection
    def disconnect(self):
        self.sock.close()

    #Starting function
    def start(self):
        #Ask user the nickname
        self.nickname = input('Enter your nickname: ')
        #create threads for users
        receive_thread = threading.Thread(target=self.receive)
        receive_thread.start()
        write_thread = threading.Thread(target=self.send_message)
        write_thread.start()    
        

            

        

        


if __name__ == '__main__':
    

    host = input("Server IP address: ")
    #port = int(input("Server port: "))
    client = ChatClient(host, 55555)

    #client = ChatClient('127.0.0.1', 55555)
    client.start()