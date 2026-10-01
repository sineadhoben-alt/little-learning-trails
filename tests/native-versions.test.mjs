import test from 'node:test';
import assert from 'node:assert/strict';
import {nativeVersionErrors} from '../scripts/verify-native-versions.mjs';
const expo={version:'0.2.0',ios:{buildNumber:'8'},android:{versionCode:8}};
const plist=(version,build)=>`<plist><dict><key>CFBundleShortVersionString</key><string>${version}</string><key>CFBundleVersion</key><string>${build}</string></dict></plist>`;
test('native version preflight catches the uploaded 0.1.0 marketing-version regression',()=>{
 assert.deepEqual(nativeVersionErrors(expo,plist('0.1.0','8'),'versionName "0.2.0"\nversionCode 8'),['iOS marketing version differs from app.json']);
});
test('native version preflight rejects stale build numbers and missing native fields',()=>{
 assert.equal(nativeVersionErrors(expo,plist('0.2.0','7'),'versionName "0.2.0"\nversionCode 7').length,2);
 assert.equal(nativeVersionErrors(expo,'<plist/>','').length,4);
});
test('native version preflight accepts consistent metadata',()=>{
 assert.deepEqual(nativeVersionErrors(expo,plist('0.2.0','8'),'versionName "0.2.0"\nversionCode 8'),[]);
});
