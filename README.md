# Question-Rotation

Problem Statement: 
Build a question rotation system that assigns questions to users based on their region. 
The questios should maintain a cycle which should be configurable and one the cycle completes, the question should be updated with a new question.
The system should be capable of handling 100k daily active users and scale to support millions of users.

Project Scope: 
The project is aimed towards the users looking to interact with this application within a certain cycle.
The questionnare asked in the application will provide a positive feedback from the users as well as some insights to the person likings.
The project is not designed any real life problem at this stage rather than just a concept of how this could be accomplished

Project Technology:
Node

Libraries used:
- Winston
- config
- node-cron
- nodemon

Project Architecture:
The project is divided into three files mainly
- config files: This will hold all the questions based on reqions for now as the project is not connected with any database at the moment. The config file also holds the duration of the cycle
- index.js: The index.js is responsible to run the cron job after the configured cycle and assign questions to the users
- logger.js: The logger.js is responsible to maintain the logs of the applications. It will maintain the logs in logfile.log file and also in uncaughtException.log if any exceptions occurs while writing the logs

Project Strategy:
The strategy for assigning questions to users based on their region is quite simple.
The questions are stored in the config file.
The system administrator should not have any obligations to maintain same number of questions for each region. The application can maintain different number of questions based on their region.
The questions are assigned based on the region and after each assigment the question cycle gets updated.
This will continue till all questions for a region are assigned to the user.
Once the questions are completed for a specific region, the system will automatically assign questions to the user from different regions.
In this case, we are using 2 seperate regions Singapore and USA
  - Let's suppose Singapore had 10 questions and USA had 11 and our user resides in Singapore.
  - Now, let's say the user was assigned all of the questions related to Singapore, the system will automatically start assigning the user with USA questions and vice versa
  - If the same thing happens to the user with USA questions i.e. all questions assigned. The system will automatically refresh itself and start from zero again
  - To make things even more streamlined, the system administrator can change the question cycle manually from the config file as well. This is to make sure if the system administrator adds some questions to the Singapore region and wants the user to get questions related to his own region after the last region based question. However, for this to work, restarting the application would be required.


Project Startup:
In order to start the project, please run the following commands
- If you just need to run the project and see how it works, just run the below commands in the terminal of the project directory:
  -  export NODE_ENV=development
  -  npm start run
  -  The cron job is set at 5 seconds for now in order to view the status of the questions
- If you wish to change the cron job cycle, please follow the below appraoch:
  -  Change cron_schedule_day_of_month, cron_schedule_hour_of_day and cron_schedule_day_of_week in the development.json file inside the config folder according to your requirements
  -  Comment out line number 6 and uncomment line number 13 in the index.js file
  -  Re-run the project
- If you wish to change the cycle of questions, please follow the below approach (Not Recommended):
  -  Change singapore_question_cycle or usa_question_cycle in the development.json file inside the config folder according to your requirements
  -  Re-run the project
 
Viewing Output:
The output will be displayed in the terminal on which the project is running after each cycle
