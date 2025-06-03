# Laravel LMS

A Laravel-based Learning Management System (LMS) designed to facilitate online education by providing tools for course management, user enrollment, and content delivery.

## Features

* **Course Management**: Create, update, and organize courses with ease.
* **User Enrollment**: Manage student registrations and course enrollments.
* **Content Delivery**: Upload and manage course materials, including videos, documents, and quizzes.
* **Assessment Tools**: Create quizzes and assignments to evaluate student performance.
* **Progress Tracking**: Monitor student progress and performance metrics.
* **Responsive Design**: Accessible on various devices, ensuring a seamless learning experience.

## Installation

### Prerequisites

* PHP >= 8.1
* Composer
* Node.js & npm
* MySQL or any other supported database
* Laravel 11 or above

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ariqd/lms.git
   cd lms
   ```



2. **Install Dependencies**

   ```bash
   composer install
   npm install && npm run dev
   ```



3. **Environment Configuration**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```



Update the `.env` file with your database and other necessary configurations.

4. **Database Migration**

   ```bash
   php artisan migrate --seed
   ```



5. **Start the Development Server**

   ```bash
   php artisan serve
   ```



Access the application at `http://localhost:8000`.

2. **Access the Application**

   Visit `http://localhost` in your browser.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License

This project is open-source and available under the [MIT License](LICENSE).
