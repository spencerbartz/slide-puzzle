<!DOCTYPE html>
<html>
  <head>
    <title>Slide Puzzle</title>
    <style>
/*
      table {
        border: 0px;
        border-collapse: collapse;
        border-spacing: 0px;

        border-image-width: 0px;
        border-image-outset: 0px;
      }

      td, tr, img {
        border-image-width: 0px;
        border-image-outset: 0px;
        border: 0px;

        padding: 0px;
        border-width: 0px;
        margin: 0px;
      }
      */

      * {
        margin: 0;
        border: 0;
        padding: 0;
        border-collapse: collapse;
        border-width: 0;
        border-spacing: 0;
        border-style: none;
        border-image-width: 0;
        line-height:0;
      }
    </style>
  </head>

  <body>
    <table callspacing="0" cellpadding="0">
      <tr><td id="0"></td><td id="1"></td><td id="2"></td></tr><tr><td id="3"></td><td id="4"></td><td id="5"></td></tr>
      <tr>
        <td id="6"></td>
        <td id="7"></td>
        <td id="8"></td>
      </tr>
    </table>

    <script src="slidepuzzle.js"></script>
  </body>
</html>
