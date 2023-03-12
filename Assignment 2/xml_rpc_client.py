import xmlrpc.client
import datetime
import xml.etree.ElementTree as ET


proxy = xmlrpc.client.ServerProxy('http://localhost:3000')
try:
    def menu():

        #While loop for the menu
        while(True):
            print("\nUsable commands:")
            print("1) Add topic, add note to the topic and add text")
            print("2) Submit all")
            print("3) Show given topic")
            print("0) Exit")
            argument= input("\nInput command number here: ")
            match argument:
                #Exit the application
                case "0":
                    print("Shutting down...\n")
                    break
                #Add topic, note and text
                case "1":
                    #Ask user the topic, note and text
                    topic = input("Enter Topic: ")
                    note = input("Enter Note: ")
                    text = input("Add Text: ")
                #Submit
                case "2":
                    today = proxy.today()
                    # convert the ISO8601 string to a datetime object
                    converted = datetime.datetime.strptime(today.value, "%Y%m%dT%H:%M:%S")
                    #Call the add function and send the user data to the server
                    proxy.add(topic,note, text, converted.strftime("%d.%m.%Y - %H:%M:%S"))
                    print("Submitted successfully!")
                #Show given topic
                case "3":
                    topicName = input("Enter Topic: ")
                    result = proxy.show(topicName)
                    print(result)
                #Error message when giving invalid credentials.
                case default:
                    print("Invalid command, try again.\n")
except Error as v:
    print("ERROR",v)

#Main client function
def main():
    menu()
    
#Call the main function
main()
