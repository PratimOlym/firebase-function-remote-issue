# firebase-function-remote-issue

1. Deploy it to a firebase functions or google cloud functions. Get the <BASE_URL> of the deployed function.
2. From POSTMAN , upload a multi-part form data to the path <BASE_URL>/api/project/newproject. Pass one image-file with fieldname as 'file' and a text field 'name' with any random value.
3. It throws error Unexpected end of form.


The error is logged here: https://stackoverflow.com/questions/73010301/http-request-to-express-backend-using-postman-is-throwing-unexpected-end-of-form

The error log from google-cloud-functions:
![multipart issue in server](https://user-images.githubusercontent.com/89311328/184549418-e9b8da94-ed74-4742-8101-3fcad33b95ef.PNG)
