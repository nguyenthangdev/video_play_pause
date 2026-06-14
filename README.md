## Play/Pause khi cuộn trang

Component `VideoFeed` chạy ở client vì cần truy cập trực tiếp vào DOM của từng thẻ `<video>`. Mỗi video card được gắn `data-video-card`, còn từng video element được lưu vào `videoRefs` theo `id`.

Khi component mount, `IntersectionObserver` quan sát các card trong container feed. Card nào hiển thị trong viewport của feed từ ngưỡng `0.72` trở lên thì video tương ứng được gọi `play()` và cập nhật `activeId`. Khi card bị cuộn qua và không còn đạt ngưỡng hiển thị, video đó được gọi `pause()`.

Video đặt `muted` và `playsInline` để trình duyệt cho phép auto-play khi cuộn trang. Khi người dùng click vào lớp video, hàm `togglePlayback` kiểm tra trạng thái `paused`: nếu đang dừng thì gọi `play()`, nếu đang phát thì gọi `pause()`.
