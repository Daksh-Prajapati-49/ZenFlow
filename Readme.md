# ZenFlow Booking System

## Overview

Welcome to the ZenFlow Booking System! This system provides a basic form page on the front end for users to enroll in batches. Users can provide their name, email, and choose a batch for enrollment. Payment details are displayed, and the system handles backend processing, including sending a confirmation email for confirmed bookings.

## Front End

### Basic Form Page

The front-end interface includes a simple form where users can enter their:

- Name
- Email
- Phone Number

Users are also prompted with payment details indicating a fee of 500/-. The system is designed to handle and display possible errors during user interactions.

## Backend

### Functionality

The backend handles user enrollment and batch information. It sends confirmation emails for successfully confirmed bookings.

### API Endpoints

#### 1. /getBatch

- **Method:** GET
- **Description:** Returns batch data for batches with available seats.
- **Response:** Batch information including batch timing, student count, month, and year.

#### 2. /enrollUser

- **Method:** POST
- **Description:** Authenticates users on the spot before proceeding to payment. Enrolls users in the selected batch.
- **Request Body:**
  - Name
  - Email
  - Batch ID
  - Month
  - Year
- **Response:** Success or error message.

## MongoDB Schema

### Users Collection

- **_id:** MongoDB ObjectId
- **Username:** String (User's name)
- **Mail id:** String (User's email)
- **Phone Number:** String (User's phone number)
- **Batch enrolled id:** MongoDB ObjectId
- **Month:** Number (Month of enrollment)
- **Year:** Number (Year of enrollment)
- **enrolledDate:** Date (Date of enrollment)

### Batches Collection

- **_id:** MongoDB ObjectId
- **Batch Timing:** String (Timing of the batch)
- **students count:** Number (Number of students enrolled in the batch)
- **Month:** Number (Month of the batch)
- **Year:** Number (Year of the batch)

## Possible Errors

- **Invalid Name or Email:** User must provide valid name and email.
- **Invalid Batch Selection:** Users need to select an available batch for enrollment.
- **Payment Failure:** Issues with payment processing.
- **Enrollment Authentication Failure:** Authentication failure during enrollment.

Feel free to explore and use the ZenFlow Booking System! Happy booking!
