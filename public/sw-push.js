/** @format */

function showNotification(title, options) {
  if (Notification.permission == 'granted') {
    return self.registration.showNotification(title, options);
  } else {
    Notification.requestPermission(function (permission) {
      if (permission == 'granted') {
        return self.registration.showNotification(title, options);
      }
    });
  }
}

self.addEventListener('push', (event) => {
  const title = 'Meal Planner';
  const options = {
    icon: '/icons/icon-512x512.png',
    badge: '/icons/icon-512x512.png',
    body: event.data.text()
  };

  event.waitUntil(showNotification(title, options));
});

// self.addEventListener('push', function (e) {
//   // Get the notification data, then display notification
//   var httpHeaders = new Headers();
//   httpHeaders.append('pragma', 'no-cache');
//   httpHeaders.append('cache-control', 'no-cache');

//   var fetchInit = {
//     method: 'GET',
//     headers: httpHeaders
//   };

//   fetch('/push', fetchInit).then(function (res) {
//     res.json().then(function (notificationData) {
//       var data = JSON.parse(notificationData);
//       showNotification(data);
//     });
//   });
// });

self.addEventListener('notificationclick', function (event) {
  if (clients.openWindow) {
    clients.openWindow('http://localhost:3000');
  }
});