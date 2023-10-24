# Ticker Integration Guide

## Modifying the Ticker

1. Navigate to `src/main.ts` and apply the necessary modifications.
2. Build the project by running the command:
   ```
   npm run build
   ```
   This will generate a new file: `dist/assets/index-HASH.js`.
3. Upload the generated file to your preferred CDN.

## Implementing the Ticker on Your Website

1. Insert an HTML element with the ID `bthn` in the desired location on your site:

   ```
   <div id="bthn"></div>
   ```

2. Include the ticker's script by adding the following tag, making sure to replace `CDN_URL` with the actual URL from your CDN:
   ```
   <script src="CDN_URL"></script>
   ```

---

**Note:** Ensure that you replace `CDN_URL` with the correct path to the script on your CDN before integrating it into your website.
