export default ({ markup, css }) => {
  return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Video Streaming App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400&display=swap" rel="stylesheet">
        
        
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link href="https://fonts.googleapis.com/css2?family=Pacifico:wght@200;300;400&display=swap" rel="stylesheet">
      </head>
      <body>
        <div id="root">${markup}</div>
        <style id="jss-server-side">${css}</style>
        <script type="text/javascript" src="./dist/bundle.js"></script>
      </body>
    </html>`;
};
