import socket
import threading


#Used Geeks for geeks as a reference for the base of this application:
#https://www.geeksforgeeks.org/simple-chat-room-using-python/
#Also used socket and threading documentation from the python website:
#https://docs.python.org/3.9/library/socket.html
#https://docs.python.org/3.9/library/threading.html

class ChatServer:
    def __init__(self, host, port):
        self.host = host
        self.port = port
        #Setting up the sockets
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.bind((self.host, self.port))
        self.sock.listen(5)
        self.clients = []
        self.nicknames = []
        self.channels = []
        print(f"Listening on {self.host}:{self.port}...")
    #Function for sending messages to all clients
    def broadcast(self, message, sender=None, channel=None):
        for client in self.clients:
            if client != sender and (channel is None or client.channel == channel):
                client.send(message)
            


    def handle(self, client):
        while True:
            try:
                message = client.recv(1024)
                self.broadcast(message)
            #Handles the disconnect from the server
            except:
                index = self.clients.index(client)
                self.clients.remove(client)
                client.close()
                nickname = self.nicknames[index]
                self.nicknames.remove(nickname)
                self.broadcast(f'{nickname} has left the chat.'.encode('ascii'))
                break

    def receive(self):
        #Main Loop for the program
        while True:
            #Accepts connection request and stores two parameters, which contain the socket object and ip address of the client
            client, address = self.sock.accept()
            print(f"Connected with {str(address)}")
            client.send('Nickname chosen successfully!'.encode('ascii'))
            nickname = client.recv(1024).decode('ascii')
            self.nicknames.append(nickname)
            self.clients.append(client)
            print(f'Nickname of the client is {nickname}!')
            self.broadcast(f'\n{nickname} has joined the chat.'.encode('ascii'))
            client.send('Connected to the server!'.encode('ascii'))
            thread = threading.Thread(target=self.handle, args=(client,))
            thread.start()

if __name__ == '__main__':
    server = ChatServer('127.0.0.1', 55555)
    server.receive()