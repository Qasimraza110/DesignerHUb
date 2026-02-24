import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Mock user database - in production, use a real database
let users = [
  {
    id: '1',
    email: 'admin@designershub.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
    fullName: 'Admin User',
    course: 'All Courses'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, course } = await request.json();

    if (!fullName || !email || !password || !course) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password: hashedPassword,
      fullName,
      course
    };

    // Add to users array (in production, save to database)
    users.push(newUser);

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}