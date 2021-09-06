# Streamr Java Client Android Example

Example for setting up publishing and subscribing threads for Android.

## Setting Up

### To build-gradle:


Add dependencies:

```
implementation 'com.streamr:client:2.2.0'
implementation 'androidx.multidex:multidex:2.0.1'
```

Add to defaultConfig:

```
multiDexEnabled true
```

Ignore licence alerts:

```
packagingOptions {
    exclude 'META-INF/DEPENDENCIES'
    exclude 'META-INF/LICENSE'
    exclude 'META-INF/LICENSE.txt'
    exclude 'META-INF/LICENSE.md'
    exclude 'META-INF/LICENSE-notice.md'
    exclude 'META-INF/license.txt'
    exclude 'META-INF/NOTICE'
    exclude 'META-INF/NOTICE.txt'
    exclude 'META-INF/notice.txt'
    exclude 'META-INF/ASL2.0'
}
```

Allow the App to access the internet by adding

```
<uses-permission android:name="android.permission.INTERNET" />
```

to the AndrtoidManifest.xml file

