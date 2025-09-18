const WelcomeLetter = (userEmail) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Phantom Thieves Letter</title>
  </head>
  <body style="margin:0;padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" valign="top" 
            background="https://i.redd.it/zv9xrj03j6p21.jpg" 
            style="background-size:cover;background-position:center;padding:40px;">
          
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="color:white;font-family:Arial,sans-serif;text-align:center;">
            <tr>
              <td>
                <h1 style="font-size:40px;margin:0 0 10px 0;text-transform:uppercase;letter-spacing:1px;">
                  Welcome to the Phan-Site
                </h1>
                <p style="font-size:18px;line-height:1.5;margin:15px 0;">
                  We have decided to steal away your twisted desires and make you confess your sins.
                </p>
                <p style="font-size:18px;line-height:1.5;margin:15px 0;">
                  This will be done tomorrow, so we hope you will be ready.
                </p>
                <div style="font-size:14px;margin-top:20px;">From,</div>
                <div style="font-size:16px;font-style:italic;">the Phantom Thieves of Hearts</div>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
`;


module.exports = {
  WelcomeLetter,
};
