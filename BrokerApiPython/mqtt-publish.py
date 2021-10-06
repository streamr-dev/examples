import random
import time
import os
from dotenv import load_dotenv
from paho.mqtt import client as mqtt_client

load_dotenv()

# insert broker name, port number, and streamID
broker = '143.215.112.253'
port = 8082
streamID = "0xf3E5A65851C3779f468c9EcB32E6f25D9D68601a/mqtt-python"

# generate client ID with pub prefix randomly
private_key = os.getenv("PRIVATE_KEY")

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(private_key)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client):
    msg_count = 0
    while True:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        result = client.publish(streamID, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{streamID}`")
        else:
            print(f"Failed to send message to topic {streamID}")
        msg_count += 1


def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()
