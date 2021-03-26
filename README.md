<h1 align="center">
  <a href="https://streamhub.com/">
    StreamHub
  </a>
  <p align="center">
  <strong>Sharing your world</strong><br>
</p>
</h1>



## Contents

- [Requirements](#-requirements)
- [Development](#-development)
- [Documentation](#-documentation)
- [License](#-license)

## 📋 Requirements
<strong>Screen/Feature </strong>
<ol>
<li> Sign in  </li>
<ul>
	<li>
       Đăng nhập bằng email
    </li>
</ul>

<li> Sign up  </li>
<ul>
	<li>
       Đăng ký bằng email
    </li>
</ul>
</ol>


## 📖 Documentation

Our api document you can visit to 
  <a href="https://localhost:3001:documentation/">
    StreamHub
  </a> including database model 

## 🔥 Development
<p>
  <strong>To build an debug file:</strong><br>
  <code>react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && cd android && ./gradlew assembleDebug
  </code> <br>
  <p><strong>Note: </strong>You can find the apk after build in app/build/outputs/apk/debug/app-debug.apk</p>
</p>
<p>
<strong>To publish a video stream using ffmpeg:</strong><br>
  <!-- publish video -->
  <code>ffmpeg -re -i video.mp4 -c copy -f flv rtmp://localhost/live/test</code>

## 📄 License

React Native is MIT licensed, as found in the [LICENSE][l] file.


[l]: https://github.com/facebook/react-native/blob/master/LICENSE
