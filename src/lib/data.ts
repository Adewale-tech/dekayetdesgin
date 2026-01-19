import { addDays } from "date-fns";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
};

export type Course = {
    id: string;
    title: string;
    instructor: string;
    level: 'Beginner' | 'Advanced';
    duration: string;
    price: number;
    imageId: string;
    description: string;
    modules: { title: string; video_url: string; content: string }[];
};

export type DashboardData = {
    activeCourses: {
        id: string;
        title: string;
        progress: number;
        imageId: string;
    }[];
    upcomingClasses: {
        id: string;
        title: string;
        date: Date;
        time: string;
    }[];
    assignments: {
        id: string;
        title: string;
        course: string;
        dueDate: Date;
        status: 'Submitted' | 'Due Soon' | 'Overdue';
    }[];
}

export const products: Product[] = [
    {
        id: "prod_1",
        name: "Exquisite Silk Evening Gown",
        price: 150000,
        category: "Dresses",
        images: ["product-1"],
        colors: ["Midnight Blue", "Ruby Red"],
        sizes: ["S", "M", "L"],
        description: "Command attention in this exquisite evening gown. Crafted from luxurious flowing silk, its elegant silhouette and rich color create a truly classy and timeless world-class dress for your most special occasions."
    },
    {
        id: "prod_2",
        name: "Tailored Charcoal Wool Blazer",
        price: 85000,
        category: "Outerwear",
        images: ["product-2"],
        colors: ["Charcoal"],
        sizes: ["S", "M", "L", "XL"],
        description: "Experience sophistication with this perfectly tailored charcoal wool blazer. Featuring a sharp, modern cut and a premium lining, it's a versatile essential for a polished and classy wardrobe."
    },
    {
        id: "prod_3",
        name: "Luxury Leather Handbag",
        price: 220000,
        category: "Accessories",
        images: ["product-3"],
        colors: ["Cognac", "Black"],
        sizes: ["One Size"],
        description: "A statement handbag made from supple, full-grain Italian leather. Its structured design and gold-plated hardware exude sophistication."
    },
    {
        id: "prod_4",
        name: "Classic Gold-Accented Stilettos",
        price: 65000,
        category: "Shoes",
        images: ["product-4"],
        colors: ["Black", "Nude"],
        sizes: ["38", "39", "40", "41"],
        description: "Elevate any look with these classic stilettos. The elegant design is complemented by a subtle gold accent on the heel."
    },
    {
        id: "prod_5",
        name: "Chic Linen Jumpsuit",
        price: 72000,
        category: "Jumpsuits",
        images: ["product-5"],
        colors: ["Oatmeal", "White"],
        sizes: ["S", "M", "L"],
        description: "Effortless style meets comfort in this chic linen jumpsuit. Perfect for warm-weather events or a sophisticated day look."
    },
    {
        id: "prod_6",
        name: "Structured Trench Coat",
        price: 110000,
        category: "Outerwear",
        images: ["product-6"],
        colors: ["Beige", "Navy"],
        sizes: ["S", "M", "L"],
        description: "A modern take on the classic trench coat. Its structured silhouette and water-resistant fabric make it both stylish and practical."
    },
    {
        id: "prod_7",
        name: "Satin Slip Dress",
        price: 58000,
        category: "Dresses",
        images: ["product-7"],
        colors: ["Champagne", "Emerald Green"],
        sizes: ["XS", "S", "M", "L"],
        description: "A versatile satin slip dress that drapes beautifully on the body. Can be dressed up with heels or down with sneakers."
    },
    {
        id: "prod_8",
        name: "High-Waisted Tailored Trousers",
        price: 75000,
        category: "Trousers",
        images: ["product-8"],
        colors: ["Cream", "Black"],
        sizes: ["S", "M", "L", "XL"],
        description: "Flattering high-waisted trousers with a wide-leg cut. Made from a premium crepe fabric for a fluid, elegant movement."
    },
    {
        id: "prod_9",
        name: "Vibrant Ankara Print Midi Dress",
        price: 68000,
        category: "Dresses",
        images: ["product-9"],
        colors: ["Multi-color Print"],
        sizes: ["S", "M", "L", "XL"],
        description: "Celebrate Nigerian fashion with this vibrant ready-made Ankara print midi dress. A popular choice for its bold patterns and flattering fit, perfect for any celebration."
    },
    {
        id: "prod_10",
        name: "Elegant Lace Aso Ebi Gown",
        price: 180000,
        category: "Dresses",
        images: ["product-10"],
        colors: ["Royal Blue", "Gold"],
        sizes: ["M", "L", "XL"],
        description: "A stunning, ready-made Aso Ebi gown crafted from intricate lace. Popular in Nigerian ceremonies, this dress embodies elegance and cultural pride, ensuring you stand out."
    },
    {
        id: "prod_11",
        name: "Modern Adire Silk Kaftan",
        price: 95000,
        category: "Dresses",
        images: ["product-11"],
        colors: ["Indigo", "Maroon"],
        sizes: ["One Size"],
        description: "A beautiful fusion of traditional Nigerian Adire dyeing techniques and modern silk kaftan silhouette. Lightweight, comfortable, and effortlessly stylish."
    },
    {
        id: "prod_12",
        name: "Men's Grand Agbada Set",
        price: 250000,
        category: "Menswear",
        images: ["product-12"],
        colors: ["White", "Royal Blue", "Black"],
        sizes: ["M", "L", "XL", "XXL"],
        description: "Make a powerful statement with this grand Agbada set, a hallmark of Nigerian men's fashion. This three-piece outfit is exquisitely embroidered and tailored for a regal presence."
    },
    {
        id: "prod_13",
        name: "Cashmere Blend Scarf",
        price: 45000,
        category: "Accessories",
        images: ["product-13"],
        colors: ["Heather Grey", "Camel"],
        sizes: ["One Size"],
        description: "An ultra-soft and luxurious cashmere blend scarf. The perfect accessory to add a touch of warmth and class to any outfit."
    },
    {
        id: "prod_14",
        name: "Velvet Smoking Slippers",
        price: 88000,
        category: "Shoes",
        images: ["product-14"],
        colors: ["Burgundy", "Forest Green"],
        sizes: ["40", "41", "42", "43", "44"],
        description: "Sophisticated velvet slippers with a quilted satin lining. Ideal for formal events or adding a touch of dapper style to your evening wear."
    }
];

export const courses: Course[] = [
    {
        id: "course_1",
        title: "Introduction to Fashion Illustration",
        instructor: "Adanna Okoro",
        level: "Beginner",
        duration: "6 Weeks",
        price: 50000,
        imageId: "course-1",
        description: "Learn the fundamentals of fashion illustration, from basic figure drawing to rendering different fabrics and textures.",
        modules: [
            { title: "Module 1: Basic Anatomy and Proportions", video_url: "", content: "Master the 9-heads fashion figure and create dynamic poses." },
            { title: "Module 2: Sketching Garments and Folds", video_url: "", content: "Learn how to realistically draw clothing on the fashion figure." },
            { title: "Module 3: Introduction to Color Theory", video_url: "", content: "Explore how to use color effectively in your illustrations." },
        ]
    },
    {
        id: "course_2",
        title: "Advanced Pattern Making & Draping",
        instructor: "Bolanle Adebayo",
        level: "Advanced",
        duration: "12 Weeks",
        price: 120000,
        imageId: "course-2",
        description: "Take your design skills to the next level by mastering complex pattern making and the art of draping fabric on a mannequin.",
        modules: [
            { title: "Module 1: Complex Bodice and Sleeve Design", video_url: "", content: "Drafting patterns for intricate top designs." },
            { title: "Module 2: Advanced Draping Techniques", video_url: "", content: "Creating gowns and complex silhouettes directly on the form." },
            { title: "Module 3: Final Project: Collection Piece", video_url: "", content: "Design and create a full garment using your new skills." },
        ]
    },
    {
        id: "course_3",
        title: "Digital Fashion Design with Procreate",
        instructor: "Chioma Nwosu",
        level: "Beginner",
        duration: "8 Weeks",
        price: 75000,
        imageId: "course-5",
        description: "Step into the future of fashion by learning how to create stunning digital illustrations and technical flats using Procreate on the iPad.",
        modules: [
            { title: "Module 1: Procreate Fundamentals for Designers", video_url: "", content: "Learn the essential tools and gestures for fashion design." },
            { title: "Module 2: Creating a Digital Croquis", video_url: "", content: "Develop your own custom fashion figure template." },
            { title: "Module 3: Rendering Fabrics and Prints", video_url: "", content: "Simulate textures like denim, silk, and patterns digitally." },
        ]
    },
    {
        id: "course_4",
        title: "The Business of Fashion",
        instructor: "Ibrahim Sadiq",
        level: "Advanced",
        duration: "10 Weeks",
        price: 95000,
        imageId: "course-6",
        description: "Learn what it takes to launch and run a successful fashion brand, from production and marketing to finance and sales.",
        modules: [
            { title: "Module 1: Brand Building and Marketing", video_url: "", content: "Define your brand identity and reach your target audience." },
            { title: "Module 2: Sourcing and Production Management", video_url: "", content: "Navigate the complexities of manufacturing and supply chains." },
            { title: "Module 3: Retail and E-commerce Strategy", video_url: "", content: "Learn how to sell your collection effectively online and in-store." },
        ]
    }
];

export const dashboardData: DashboardData = {
    activeCourses: [
        { id: "dash_course_1", title: "Introduction to Fashion Illustration", progress: 65, imageId: "course-1" },
        { id: "dash_course_2", title: "The Business of Fashion", progress: 20, imageId: "course-6" },
    ],
    upcomingClasses: [
        { id: "class_1", title: "Live Q&A: Color Theory", date: addDays(new Date(), 2), time: "4:00 PM" },
        { id: "class_2", title: "Critique Session: Module 2", date: addDays(new Date(), 5), time: "2:00 PM" },
        { id: "class_3", title: "Guest Lecture: Building a Brand", date: addDays(new Date(), 9), time: "6:00 PM" },
    ],
    assignments: [
        { id: "assign_1", title: "Final Illustration Submission", course: "Fashion Illustration", dueDate: addDays(new Date(), 3), status: "Due Soon" },
        { id: "assign_2", title: "Business Plan Draft", course: "The Business of Fashion", dueDate: addDays(new Date(), 10), status: "Submitted" },
        { id: "assign_3", title: "Figure Drawing Practice", course: "Fashion Illustration", dueDate: addDays(new Date(), -2), status: "Overdue" },
    ]
};
