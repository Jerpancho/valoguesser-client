# Valoguesser

Valorant is an FPS shooter with an added abilities mechanic that encourages teamplay and having extensive game knowledge.

Geoguessr is a geography game where players are tested to find a location given from a google street view image.

Valoguesser therefore is a geography game based on the maps of valorant where you are given a randomly selected image and must find its location in the map mode the player selected. The purpose was to create an entertaining and educating game that helps players increase their map knowledge. 

live: [https://valoguesser.netlify.app/](https://valoguesser.netlify.app/)

note: The backend server is deployed on a free service that will shutoff when reaching certain hours and manually reset by the start of each month. Meaning the app will only work a certain amount of days of the month.

## Overview

This web application allows you to select a series of maps from the game of valorant fetched from a backend api along with five round images with both their hidden and expanded forms.

If you are a valid authorized user, you also have the ability to create rounds yourself in the round create page. note: this feature is still in progress of creating a system that will give users access to create rounds.

## Tools used for the project

Frontend: 

React, tanstack query, react router, leaflet

Backend (in a seperate repo): 

Cloudinary, postgres, express, multer, jwt auth
