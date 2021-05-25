package com.example.streamrjavaclienttest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

import com.streamr.client.MessageHandler;
import com.streamr.client.StreamrClient;
import com.streamr.client.authentication.EthereumAuthenticationMethod;
import com.streamr.client.options.StreamrClientOptions;
import com.streamr.client.protocol.message_layer.StreamMessage;
import com.streamr.client.rest.Stream;
import com.streamr.client.subs.Subscription;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        String ethereumPrivateKey = "YOUR_ETHEREUM_PRIVATE_KEY";
        String streamId = "YOUR_STREAM_ID";

        Thread subscribingThread = new Thread(new Runnable() {
            @Override
            public void run() {
                TextView textView = (TextView) findViewById(R.id.textView);
                textView.setText("Subscribing Thread");
                try {
                    setText(textView, "Starting Subscribing Streamr Client");
                    StreamrClient client = new StreamrClient(new EthereumAuthenticationMethod(ethereumPrivateKey));
                    Stream stream = client.getStream(streamId);
                    setText(textView, "Subscribing to stream " + stream.getName());
                    Subscription sub = client.subscribe(stream, new MessageHandler() {
                        @Override
                        public void onMessage(Subscription s, StreamMessage message) {
                            setText(textView, "Message Received: " + message.getParsedContent().toString());
                        }
                    });
                } catch (Exception e) {
                    setText(textView, e.toString());
                    e.printStackTrace();
                }
            }
        });

        Thread publishingThread = new Thread(new Runnable() {
            @Override
            public void run() {
                TextView textView = (TextView) findViewById(R.id.textView2);
                textView.setText("Publishing Thread");
                try {
                    setText(textView, "Starting Publishing Streamr Client");
                    StreamrClient client = new StreamrClient(new EthereumAuthenticationMethod(ethereumPrivateKey));
                    Stream stream = client.getStream(streamId);
                    setText(textView, "Starting publishing to Stream " + stream.getName());
                    for (int i = 0; i < 2000; i++) {
                        Map<String, Object> payload = new HashMap<>();
                        payload.put("msg", i);
                        setText(textView, "Publishing message: " + payload.toString());
                        client.publish(stream, payload);
                        Thread.sleep(500);
                    }
                } catch (Exception e) {
                    setText(textView, e.toString());
                    e.printStackTrace();
                }
            }
        });

        subscribingThread.start();
        publishingThread.start();

    }

    private void setText(final TextView text,final String value){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                text.setText(value);
            }
        });
    }
}