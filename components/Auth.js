import React, { Component } from 'react';
import { StyleSheet, WebView } from 'react-native';

// The html for the webview can be seen here https://gist.github.com/xpsdeset/72a0ca5b774dfdbc8f60d45dbf379967
// Needed for fix "Setting onMessage on a WebView overrides existing values of window.postMessage, but a previous value was defined." You get the issue for ios
const patchPostMessageFunction = function () {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function (message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function () {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };
    console.log(patchedPostMessage)
    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

const getObject= function (str) {
    try {
        return JSON.parse(str)
    } catch (error) {
        false
    }
    
}


export default class WebViewTest extends Component {

    constructor(props) {
        super(props);
    }
    onMessage(m) {
        var data=getObject(m.nativeEvent.data);
        if (data && data.loggedIn)
            alert('Hey you have logged in')
            console.log(m)
            this.props.navigation.navigate('Home') 
    }

    render() {
        return (
            <WebView ref={(wv) => { this.webView = wv; }}
                source={{ uri: 'https://suspicious-joliot-5ebaf4.netlify.com' }}
                    injectedJavaScript={patchPostMessageJsCode} 
                    onMessage={m => this.onMessage(m)}  
                    pointerEvents={"none"}
                    style={styles.webView}
                    />
        );
    }
}


const styles = StyleSheet.create({
    webView: {
        marginTop: 50
    }
});

