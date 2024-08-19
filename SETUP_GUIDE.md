# Installation and Launch Instructions

## 1. Clone the Repository
First, clone your repository to your local machine:
```
git clone <your-repository-url>
cd <your-repository-directory>
```

## 2. Install Dependencies
First, clone your repository to your local machine:
```
git clone <your-repository-url>
cd <your-repository-directory>
```

## 3. iOS Setup
For iOS, navigate to the ios directory and install the necessary CocoaPods:
```
cd ios
pod install
cd ..
```

## 4. Android Setup
For Android, make sure the local.properties file in the android directory is correctly set up with your Android SDK path:
```
# Create or edit the android/local.properties file to include the following line:
sdk.dir = /path/to/your/android/sdk
```

## 5. Running the Project
To run the project on an iOS or Android emulator/simulator:
**iOS**
```
npx react-native run-ios
```
**Android**
```
npx react-native run-android
```

## 6. Running Tests
To run tests, you can use the following command:
```
npm test
# or
yarn test
```

## Additional Commands
- Start Metro Bundler (in case it doesn't start automatically):
```
npx react-native start
```
Build APK (Android):
```
cd android
./gradlew assembleRelease
```