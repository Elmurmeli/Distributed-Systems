from xmlrpc.server import SimpleXMLRPCServer
from xmlrpc.server import SimpleXMLRPCRequestHandler
import xmlrpc.client
import datetime
import xml.etree.ElementTree as ET


tree = ET.parse('db.xml')
root = tree.getroot()

#Datetime
def today():
    today= datetime.datetime.today()
    return xmlrpc.client.DateTime(today)

class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)
    
#Used as a reference for the XMLRP server:
#https://docs.python.org/3/library/xmlrpc.server.html#module-xmlrpc.server
with SimpleXMLRPCServer(('localhost', 3000),
                        requestHandler=RequestHandler) as server:
    server.register_introspection_functions()
    
    print('Serving XML-RPC on localhost port 8000')
    
    def add_note(topic, note, text, timestamp):
        
        
        #For loop for finding all the topics and checking if the topic has same name as user input
        for child in root.findall("topic"):
            #If the topic exists, appends the data to an existing topic
            if(child.attrib == {"name": topic}):
                # Used as a reference for subElement usage: 
                # https://docs.python.org/3/library/xml.etree.elementtree.html#xml.etree.ElementTree.SubElement
                elementNote =ET.SubElement(child, "note", attrib={"name": note}, )
                elementText =ET.SubElement(elementNote, "text")
                elementText.text = text
                elementTime= ET.SubElement(elementNote, "timestamp")
                elementTime.text = timestamp
                break
            #If the topic does not exist, creates new XML entry
            else:
                elementTopic= ET.SubElement(root, "topic", attrib={"name": topic} )
                elementNote= ET.SubElement(elementTopic, "note", attrib={"name": note}, )
                elementText= ET.SubElement(elementNote, "text")
                elementText.text = text
                elementTime= ET.SubElement(elementNote, "timestamp")
                elementTime.text = timestamp
                break
                
        
                
        
        # Saves the data in output.xml file
        tree.write('output.xml')
        return topic, note, text, timestamp
    server.register_function(add_note, "add")
    
    
    #Function for showing the user the contents of their chosen topic
    def show(topicName):
        for child in root.find("./topic[@name= '{}']".format(topicName)):
            note = child.get("name")
            text = child.find('text').text
            timestamp = child.find('timestamp').text
  
                
        return (note, text, timestamp)

    server.register_function(show, "show")
    
    
    server.register_function(today, "today")



        
    


    # Run the server's main loop
    try: 
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nKeyboard interrupt received, exiting.")
        exit(0)