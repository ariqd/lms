<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Activity;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activities = [
            [
                'user_id' => 4, // Lembaga
                'type' => 'ba',
                'name' => 'Baitul Arqam Tingkat Dasar',
                'slug' => 'baitul-arqam-tingkat-dasar',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'goals' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'date_start' => '2025-07-12',
                'date_end' => '2025-07-12',
                'time_start' => '07:00:00',
                'time_end' => '16:00:00',
                'registration_deadline' => '2025-06-30',
                'participant_count' => 50,
                'location' => 'Jakarta',
                'daily_schedule' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'total_budget' => 10000000,
                'additional_needs' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'additional_equipments' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'contact_name' => 'PIC Lembaga',
                'contact_phone' => '081234567890',
                'contact_email' => 'pic@lembaga.com',
                'notes' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'is_active' => true,
                'status' => 'pending',
            ],
            [
                'user_id' => 4, // Lembaga
                'type' => 'da',
                'name' => 'Darul Arqam Tingkat Dasar',
                'slug' => 'darul-arqam-tingkat-dasar',
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'goals' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'date_start' => '2025-07-12',
                'date_end' => '2025-07-12',
                'time_start' => '07:00:00',
                'time_end' => '16:00:00',
                'registration_deadline' => '2025-06-30',
                'participant_count' => 50,
                'location' => 'Jakarta',
                'daily_schedule' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'total_budget' => 10000000,
                'additional_needs' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'additional_equipments' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'contact_name' => 'PIC Lembaga',
                'contact_phone' => '081234567890',
                'contact_email' => 'pic@lembaga.com',
                'notes' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae eum natus, deleniti neque illum in possimus. Eveniet, neque repellendus minus laborum ipsam numquam debitis nulla natus dicta molestias, minima voluptate.',
                'is_active' => true,
                'status' => 'pending',
            ]
        ];

        foreach ($activities as $activity) {
            Activity::create($activity);
        }
    }
}
