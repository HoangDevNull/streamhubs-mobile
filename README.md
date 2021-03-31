<h1 align="center">
  <strong>
  <a href="https://streamhub.com/">
    StreamHub
  </a>
  </strong>
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
<li> UI/UX (All)</li>
<ul>
	<li>
       Material UI
    </li>
    <li>
       Dark mode
    </li>
</ul>
<li> Welcome screen </li>
<ul>
	<li>
       Chuyển đến screen đăng nhập 
    </li>
    <li>
       Chuyển đến screen đăng ký
    </li>
</ul>

<li> Sign in  </li>
<ul>
	<li>
       Đăng nhập bằng email
    </li>
    <li>
       Validate form đăng nhập
    </li>
    <li>
       Báo lỗi khi nếu đăng nhập không thành công
    </li>
</ul>

<li> Sign up  </li>
<ul>
	<li>
       Đăng ký bằng email
    </li>	
    <li>
       Active tài khoản thông qua email
    </li>
    <li>
       Validate form đăng kí ( email, mật khẩu, username, password )
    </li>
    <li>
       Kiểm tra user trùng lặp
    </li>
    <li>
       Báo lỗi khi nếu đăng ký không thành công
    </li>
</ul>

<li> Forgot Password  </li>
<ul>
    <li>
       Lấy mật khẩu bằng email 
    </li>
    <li>
       Kiểm tra email có hợp lệ
    </li>
</ul>

<li> User Profile  </li>
<ul>
    <li>
       Hiển thị thông tin user
    </li>
    <li>
       Hiển thị banner
    </li>
    <li>
      Hiển thị số lượng người đã theo dõi kênh    
    </li>
    <li>
      Hiển thị số lượng kênh đã theo dõi    
    </li>
    <li>
       Cho phép khởi tạo stream bằng 1 button ngay tại screen này
    </li>
    <li>
       Chuyển đổi theme (dark mode)
    </li>
    <li>
       Thay đổi thông tin tài khoản
    </li>
    <li>
       Thay đổi mật khẩu tài khoản
    </li>    
     <li>
       Thay đổi màu chat
    </li>
    <li>
       Đăng xuất
    </li>
</ul>

<li> Following screen </li>
<ul>
    <li>
      Hiển thị các category đã thích
    </li>
    <li>
      Hiển thị các kênh đã đăng ký và đang live
    </li>
     <li>
      Hiển thị các kênh đang live và nhiều người xem ( Suggestion channel )
    </li>
    <li>
      Hiển thị các streamer đã đăng ký
    </li>
</ul>

<li> Discovery screen </li>
<ul>
    <li>
       Hiển thị các category nổi bật bằng slider
    </li>
    <li>
       Gợi ý 1 category phù hợp với user
    </li>
    <li>
       Liệt kê các category hàng đầu theo list
    </li>
    <li>
       Hiển thị các nhãn gắn liền với category
    </li>
    <li>
       Phân trang bằng load more action
    </li>
</ul>

<li> Browse screen </li>
<ul>
    <li>
       Hiển thị toàn bộ các kênh 
    </li>  
    <li>
       Hiển thị toàn bộ các category
    </li>
    <li>
       Hiển thị các nhãn gắn liền với category
    </li>
    <li>
       Sắp xếp và lọc theo mong muốn bằng 1 dialog khi press vào button
    </li>
</ul>

<li> Gamming screen </li>
<ul>
     <li>
       Hiển thị toàn bộ các kênh có category là gaming 
    </li>  
</ul>

<li> Detail stream screen </li>
<ul>
    <li>
       Hiển thị video stream 
    </li>
    <li>
       Hiển thị tên streamer
    </li>
    <li>
       Hiển thị thông tin của strean (Description, viewer)
    </li>
    <li>
       Cho phép user chưa đăng kí có thể đăng kí kênh
    </li>
    <li>
       Cho phép user chưa đăng kí có thể đăng kí kênh
    </li>
    <li>
       Trò truyện realtime tại kênh
    </li>
    <li>
       Trò truyện bằng emote 
    </li>
    <li>
      	Chủ kênh có quyền block các viewer từ phần trò chuyện
    </li>
    <li>
      	Thông báo stream kết thúc đến các viewer khi streammer bị disconnect
    </li>
</ul>

<li> Search screen </li>
<ul>
    <li>
      Search theo tên kênh ( tên streammer )
    </li>
    <li>
      Lọc theo category
    </li>  
    <li>
      Lọc theo tags
    </li> 
    <li>
      Ưu tiên search với các kênh đã theo dõi hoặc đang online
    </li>
    <li>
      Áp dụng fulltext search phía backend để cải thiện hiệu quả search
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
<strong>Run with localhost rest api</strong><br>
<code>adb reverse tcp:3001 tcp:3001</code>

## 📄 License

React Native is MIT licensed, as found in the [LICENSE][l] file.

[l]: https://github.com/facebook/react-native/blob/master/LICENSE
