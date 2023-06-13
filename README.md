# Omniorganizer

Simple project for storing your daily notes, spending and eating habits. It includes backend and frontend served from Django and is dockerized. Majority of the actions are handled by an API. 

# Setup
* Download the project onto your system
* First you need to build containers. Go to root folder in the command line and enter "docker build ." in the command line
* Then you need to enter the command "docker-compose up -d --build" to create both containers
* Turn on the containers if they are not on yet and then go to https://localhost:8000/ to see if it works
* Swap the secret key for your own secret key in settings.py file (in omni_organizer folder)
* Perform migrations - enter the command "docker-compose exec web_v2 python manage.py makemigrations" and then "docker-compose exec web_v2 python manage.py migrate"


After that you should be able to create a new superuser in the command line (you need to do this in the container - using "docker-compose exec web_v2 python manage.py createsuperuser" command
You should also be able to register a new user at http://localhost:8000/register/

# Overview
The project includes apps that help keep track on user's daily habits. In the Finances app a user can keep his/her expenses and see how much he/she spends in a month in a given category. 

In the Meals app a user can add food products with their nutrients and then build a meal plan with those products. User is being displayed with all the nutrients and gets an overview of how much he/she eats.

In the Notes app a user is able to store very simple notes. There are plans to incorporate ckeditor in the input field.

# Plans for further development
* There is also a 4th app in the plans, which will help the user track his/her progress in the gym. I will also need to change the technology/completely rewrite the project, making the frontend being served separately, so I can incorporate JWT authentication, like modern websites do - that will be the next iteration of the project.

* Finances app - I would also like to include in the future more graphs making the spending habits more appealing and visual to the user. Also adding some features like blockades on some of the types of expenses. I plan on adding a feature which will allow the user to create his/her own expenses type and make it more personalised. Additionally I will incorporate a feature that will store average spending across all months that will be displayed to the user. The app treats expenses only from the current year, meaning that if the user will add an expense in the next year, it will be added in the current year's spending - this will be changed.

* Meals app - I plan on adding a new feature which will allow the user to preview the meal plans in neat tables and not only in rows. There are also plans to add a feature that will allow the user to create and save a given meal plan and then place it in the meal plan. User will be able to have many different meal plans of the same type, which then he/she will be able to specify and add to the main plan. 

* Finally, I would also like to make the project responsive, so that the user can use it on mobile phones. 

As the project is just showcasing simple API processes, it is missing proper user profile features (email address changing, password changing, profile deleting) as well as proper authentication - due to the fact, that templates are rendered by Django, I could not implement JWT authentication, which I really would like to have. Project is also lacking a proper, modern and trendy look, I can admit that. 


# Project preview

* Finances app
![fin](https://github.com/paka95/omni_organizer_v2/assets/94203043/f1e5990b-83b2-469d-ad49-31765b81c624)

* Meals app
![meals](https://github.com/paka95/omni_organizer_v2/assets/94203043/c7c14ebf-209a-422a-a649-9c86276cadd4)

* Notes app
![notes](https://github.com/paka95/omni_organizer_v2/assets/94203043/c96d29e3-36e4-4c87-9c32-82a1c33f6c3e)

* Navigating website

https://github.com/paka95/omni_organizer_v2/assets/94203043/49762333-2773-4865-ba6e-ac4e60995a08


* Finances app

https://github.com/paka95/omni_organizer_v2/assets/94203043/de87d8fa-4f53-4513-a3df-8b1821eed066


* Meals app

https://github.com/paka95/omni_organizer_v2/assets/94203043/7815ef98-2dd8-4c4f-9b65-1d9c4119fafd


https://github.com/paka95/omni_organizer_v2/assets/94203043/e72fac30-232f-453c-9efd-07a8f44fbe4e


* Notes app

https://github.com/paka95/omni_organizer_v2/assets/94203043/69bb2194-7c15-47ff-ae4c-96b29d49b060



