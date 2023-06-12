# Omniorganizer

Simple project for storing your daily notes, spending and eating habits. Project includes backend and frontend served from Django and it is dockerized. Vast majority of the processes are handled by an API. 

# Setup
* Download the project onto your system
* First you need to build containers. Go to root folder in the command line and enter "docker build ." in the command line
* Then you need to enter the command "docker-compose up -d --build" to create both containers
* Turn on the containers if they are not on yet and then go to https://localhost:8000/ to see if it works
* Swap the secret key for your own secret key in settings.py file (in omni_organizer folder)
* Perform migrations - enter the command "docker-compose exec web_v2 python manage.py makemigrations" and then "docker-compose exec web_v2 python manage.py migrate"


After that you should be able to create a new superuser in the command line (you need to do this in the container - using "docker-compose exec web_v2 python manage.py createsuperuser" command
You should also be able to register a new user at http://localhost:8000/register/

# What is lacking
As the project is just showcasing simple API processes, it is missing proper user profile features (email address changing, password changing, profile deleting) as well as proper authentication - due to the fact, that templates are rendered by Django, I could not implement JWT authentication, which I really would like to have. Project is also lacking a proper, modern and trendy look, I can admit that. 

# Plans for further development
There is also a 4th app in the plans, which will help the user track his/her progress in the gym. I will also need to change the technology/completely rewrite the project, making the frontend being served separately, so I can incorporate JWT authentication, like modern websites do - that will be the next iteration of the project.

Regarding finances app - I would also like to include in the future more graphs making the spending habits more appealing and visual to the user. Also adding some features like blockades on some of the types of expenses. Also I plan on adding a feature which will allow the user to create his/her own expenses type and make it more personalised.

Regarding meals app - I plan on adding a new feature which will allow the user to preview the meal plans in neat tables and not only in rows. There are also plans to add a feature that will allow the user to create and save a given meal plan and then place it in the meal plan. User will be able to have many different meal plans of the same type, which then he/she will be able to specify and add to the main plan. 

Finally, I would also like to make the project responsive, so that the user can use it on mobile phones. 
