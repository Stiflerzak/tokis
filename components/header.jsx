import React from 'react'
import { Button } from './ui/button'
import { Heart, ShoppingCart, Layout, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser'
import Image from 'next/image'
import { HomeSearch } from '@/components/home-search'






// const Header = async ({ isAdminPage = false }) => {
//   const user = await checkUser()
//   const isAdmin = user?.role === 'ADMIN'

//   return (
//     <header className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
//       <nav className='mx-auto px-4 py-4 flex items-center justify-between'>
//         <Link
//           href={isAdminPage ? '/admin' : '/'}
//           className='flex items-center text-4xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors'
//         >
//           TOKIS
//           {isAdminPage && (
//             <span className='ml-2 text-xs font-extralight'>admin</span>
//           )}
//         </Link>

//         {/* Action Buttons */}
//         <div className='flex items-center space-x-4'>
//           {isAdminPage ? (
//             <>
//               <Link href='/'>
//                 <Button variant='outline' className='flex items-center gap-2'>
//                   <ArrowLeft size={18} />
//                   <span>Back to App</span>
//                 </Button>
//               </Link>
//             </>
//           ) : (
//             <SignedIn>
//               {!isAdmin && (
//                 <Link
//                   href='/reservations'
//                   className='text-gray-600 hover:text-blue-600 flex items-center gap-2'
//                 >
//                   <Button variant='outline'>
//                     <CarFront size={18} />
//                     <span className='hidden md:inline'>My Reservations</span>
//                   </Button>
//                 </Link>
//               )}
//               <a href='/saved-cars'>
//                 <Button className='flex items-center gap-2'>
//                   <Heart size={18} />
//                   <span className='hidden md:inline'>Saved Cars</span>
//                 </Button>
//               </a>
//               {isAdmin && (
//                 <Link href='/admin'>
//                   <Button variant='outline' className='flex items-center gap-2'>
//                     <Layout size={18} />
//                     <span className='hidden md:inline'>CEO'S WORKSPACE</span>
//                   </Button>
//                 </Link>
//               )}
//             </SignedIn>
//           )}

//           <SignedOut>
//             {!isAdminPage && (
//               <SignInButton forceRedirectUrl='/'>
//                 <Button variant='outline'>Login</Button>
//               </SignInButton>
//             )}
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: 'w-10 h-10',
//                 },
//               }}
//             />
//           </SignedIn>
//         </div>
//       </nav>
//     </header>
//   )
// }

// export default Header



// import React from 'react'
// import Link from 'next/link'
// import { Button } from './ui/button'
// import { Heart, ShoppingCart, Layout, ArrowLeft, Search, User } from 'lucide-react'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
// import { checkUser } from '@/lib/checkUser'

// // Placeholder categories and subcategories
// const categories = [
//   {
//     id: 'hiking-gear',
//     name: 'Hiking Gear',
//     icon: <span>🥾</span>,
//     thumbnail: '/images/hiking.jpeg',
//     subcategories: ['Backpacks', 'Tents', 'Boots'],
//   },
//   {
//     id: 'perfumes',
//     name: 'Perfumes',
//     icon: <span>🌸</span>,
//     thumbnail: '/images/perfumes.jpg',
//     subcategories: ['Men', 'Women', 'Unisex'],
//   },
//   {
//     id: 'gym-equipment',
//     name: 'Gym Equipment',
//     icon: <span>🏋️</span>,
//     thumbnail: '/images/gym.jpg',
//     subcategories: ['Weights', 'Machines', 'Accessories'],
//   },
// ]

// const Header = async ({ isAdminPage = false }) => {
//   const user = await checkUser()
//   const isAdmin = user?.role === 'ADMIN'
//   const totalItems = 0 

//   return (
//     <nav className="bg-black text-white sticky top-0 z-50">
//       <div className="mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           href={isAdminPage ? '/admin' : '/'}
//           className="flex items-center text-4xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors ml-16"
//         >
//           TOKIS
//           {isAdminPage && (
//             <span className="ml-2 text-xs font-extralight">admin</span>
//           )}
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex items-center space-x-8">
//           {categories.map((category) => (
//             <div key={category.id} className="relative group">
//               <Link
//                 href={`/category/${category.id}`}
//                 className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-900 hover:text-yellow-500 transition-all duration-200"
//               >
//                 <span className="text-lg">{category.icon}</span>
//                 <span className="font-medium">{category.name}</span>
//               </Link>
//               {/* Subcategories (shown on hover with CSS only) */}
//               {category.subcategories?.length > 0 && (
//                 <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-2xl border border-yellow-500/20 overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
//                   <div className="p-4">
//                     <div className="flex items-center space-x-3 mb-4">
//                       <img
//                         src={category.thumbnail}
//                         alt={category.name}
//                         className="w-12 h-12 rounded-lg object-cover"
//                       />
//                       <div>
//                         <h3 className="font-semibold text-gray-900">{category.name}</h3>
//                         <p className="text-sm text-gray-600">{category.subcategories.length} categories</p>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       {category.subcategories.map((sub) => (
//                         <Link
//                           key={sub}
//                           href={`/category/${category.id}/${sub.toLowerCase()}`}
//                           className="block px-3 py-2 rounded-lg hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
//                         >
//                           {sub}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
//           <div className="relative w-full">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
//             />
//           </div>
//         </div>

//         {/* Right Side Icons & Actions */}
//         <div className="flex items-center space-x-4">
//           {isAdminPage ? (
//             <Link href="/">
//               <Button variant="outline" className="flex items-center gap-2">
//                 <ArrowLeft size={18} />
//                 <span>Back to App</span>
//               </Button>
//             </Link>
//           ) : (
//             <SignedIn>
//               {!isAdmin && (
//                 <Link href="/orders" className="flex items-center gap-2">
//                   <Button variant="outline" className="flex items-center gap-2">
//                     <ShoppingCart size={18} />
//                     <span className="hidden md:inline">My Orders</span>
//                   </Button>
//                 </Link>
//               )}
//               <Link href="/bucketlist">
//                 <Button className="flex items-center gap-2">
//                   <Heart size={18} />
//                   <span className="hidden md:inline">My Product Bucketlist</span>
//                 </Button>
//               </Link>
//               {isAdmin && (
//                 <Link href="/admin">
//                   <Button variant="outline" className="flex items-center gap-2">
//                     <Layout size={18} />
//                     <span className="hidden md:inline">CEO'S WORKSPACE</span>
//                   </Button>
//                 </Link>
//               )}
//             </SignedIn>
//           )}

//           <SignedOut>
//             {!isAdminPage && (
//               <SignInButton forceRedirectUrl="/">
//                 <Button variant="outline">Login</Button>
//               </SignInButton>
//             )}
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: 'w-10 h-10',
//                 },
//               }}
//             />
//           </SignedIn>

//           <Link href="/cart" className="relative p-2 hover:text-yellow-500 transition-colors">
//             <ShoppingCart className="w-5 h-5" />
//             {totalItems > 0 && (
//               <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Header




// Categories configuration
const categories = [
  {
    id: 'hiking-gear',
    name: 'Hiking Gear',
    icon: <span>🥾</span>,
    thumbnail: '/images/hiking.jpeg',
    subcategories: ['Backpacks', 'Tents', 'Boots'],
  },
  {
    id: 'perfumes',
    name: 'Perfumes',
    icon: <span>🌸</span>,
    thumbnail: '/images/perfumes.jpg',
    subcategories: ['Men', 'Women', 'Unisex'],
  },
  {
    id: 'gym-equipment',
    name: 'Gym Equipment',
    icon: <span>🏋️</span>,
    thumbnail: '/images/gym.jpg',
    subcategories: ['Weights', 'Machines', 'Accessories'],
  },
]

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser()
  const isAdmin = user?.role === 'ADMIN'
  const totalItems = 0 

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={isAdminPage ? '/admin' : '/'}
          className="flex items-center text-4xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors ml-16"
        >
          TOKIS
          {isAdminPage && (
            <span className="ml-2 text-xs font-extralight text-yellow-500">admin</span>
          )}
        </Link>

        {/* Desktop Navigation - Only show on non-admin pages */}
        {!isAdminPage && (
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <div key={category.id} className="relative group">
                <Link
                  href={`/category/${category.id}`}
                  className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-900 hover:text-yellow-500 transition-all duration-200"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </Link>
                {/* Subcategories dropdown */}
                {category.subcategories?.length > 0 && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-2xl border border-yellow-500/20 overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src={category.thumbnail}
                          alt={category.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.subcategories.length} categories</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            href={`/category/${category.id}/${sub.toLowerCase()}`}
                            className="block px-3 py-2 rounded-lg hover:bg-yellow-50 hover:text-yellow-700 transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Search Bar - Only show on non-admin pages */}
        {!isAdminPage && (
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400"
              /> */}
                        <HomeSearch />

            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <>
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </Button>
              </Link>
            </>
          ) : (
            <SignedIn>
              {!isAdmin && (
                <Link href="/orders">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    <ShoppingCart size={18} />
                    <span className="hidden md:inline">My Orders</span>
                  </Button>
                </Link>
              )}
              
              <Link href="/bucketlist">
                <Button className="flex items-center gap-2 bg-yellow-500 text-black hover:bg-yellow-400 transition-colors">
                  <Heart size={18} />
                  <span className="hidden md:inline">Bucketlist</span>
                </Button>
              </Link>
              
              {isAdmin && (
                <Link href="/admin">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                  >
                    <Layout size={18} />
                    <span className="hidden md:inline">CEO'S WORKSPACE</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            {!isAdminPage && (
              <SignInButton forceRedirectUrl="/">
                <Button 
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  Login
                </Button>
              </SignInButton>
            )}
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                },
              }}
            />
          </SignedIn>

          {/* Shopping Cart - Only show on non-admin pages */}
          {!isAdminPage && (
            <Link href="/cart" className="relative p-2 hover:text-yellow-500 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header