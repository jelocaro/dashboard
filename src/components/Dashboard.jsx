import axios from 'axios';
import { SearchIcon } from '@heroicons/react/solid';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ClockIcon, HomeIcon, MenuAlt1Icon, XIcon } from '@heroicons/react/outline'

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const navigation = [
  { name: '.', href: '#', icon: HomeIcon, current: true },
  { name: '.', href: '#', icon: HomeIcon, current: false },
  { name: '.', href: '#', icon: ClockIcon, current: false },
]
const teams = [
  { name: 'Ingenieria', href: '#', bgColorClass: 'bg-indigo-500' },
  { name: 'Recursos Humanos', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Satisfacción del Cliente', href: '#', bgColorClass: 'bg-yellow-500' },
]

function classNames(...classes) { return classes.filter(Boolean).join(' '); }

import logo from '../assets/Img/M.png';
import broom from '../assets/icons/broom.png';
import oops from '../assets/Img/Empty.png';
import Modal from './Modal';
import Profile from './Profile';

export default function Dashboard() {

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [users, setUsers] = useState([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(1);
  const [state, setState] = useState('1');
  const [userId, setUserId] = useState(null)


  function getUsers() {
    fetch("http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1214743938/users").then((result) => {
      result.json().then((resp) => {
        const usuarios = resp.users;
        usuarios.map(usuario => {
          let fecha = new Date(usuario.updated_at);
          fecha = String(fecha.getDate()).padStart(2, '0') +
            "/" + (fecha.getMonth() + 1) +
            "/" + fecha.getFullYear() +
            " " + fecha.getHours() +
            ":" + fecha.getMinutes() +
            ":" + fecha.getSeconds();

          usuario.updated_at = fecha;
        });
        setUsers(usuarios);
        setName(resp.users[0].name)
        setEmail(resp.users[0].email)
        setProfile(resp.users[0].profile)
        setState(resp.users[0].state)
        setUserId(resp.users[0].id)
      })
    })
  }

  function deleteUser(id) {
    fetch(`http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1214743938/users/${userId}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }
  function selectUser(id) {
    let item = users[id];
    console.log(item);
    setName(item.name)
    setEmail(item.email)
    setProfile(item.profile);
    setState(item.state);
    setUserId(item.id)
  }
  function updateUser(e) {
    e.preventDefault();
    let item = { name, email, profile, state }
    console.warn("profile: ", profile)
    console.warn("item", item)
    fetch(`http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/1214743938/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers();
      })
    })
    setShowModal2(false)
  }

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get('http://pruebasclaro.movilbox.net:81/desarrollo/test_mbox/public/api/profiles')
      .then(response => {
        setAPIData(response.data.profiles)
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [open, setOpen] = useState(true);

  console.log(users);
  const usersCount = () => {
    if (users.length === 0) {
      console.log('Vacio');
      return (
        <>
          <img src={oops} alt="" />
        </>
      )
    }
  }

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="mt-8">
                      <h3
                        className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        id="mobile-teams-headline"
                      >
                        Equipos
                      </h3>
                      <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-teams-headline">
                        {teams.map((team) => (
                          <a
                            key={team.name}
                            href={team.href}
                            className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                          >
                            <span
                              className={classNames(team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
                              aria-hidden="true"
                            />
                            <span className="truncate">{team.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className={`hidden lg:flex lg:flex-col lg:w-28 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100 gap-24`}>
          <div className="flex flex-col items-center flex-shrink-0 px-6">
            <img
              className="h-7 w-auto mb-7"
              src={logo}
              alt="MovilBox"
              onClick={() => setOpen(!open)}
            />
            <div className="space-y-1">
              <a
                key="Share"
                href="#"
                className={classNames(
                  true ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                  'group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                  true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>

              </a>
            </div>
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-6 h-0 flex-1 flex items-center flex-col overflow-y-auto">
            {/* Navigation */}
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                <a
                  key="Inicio"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </a>
                <a
                  key="Alertas"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                  </svg>

                </a>
                <a
                  key="Auricular"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <img className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )} src="https://img.icons8.com/ios/50/000000/listening-to-music-on-headphones.png" />
                </a>
                <a
                  key="Cart"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>

                </a>
                <a
                  key="Docs"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>

                </a>
                <a
                  key="User"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>

                </a>
                <a
                  key="Lock"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>

                </a>
                <a
                  key="Users"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>

                </a>
                <a
                  key="QA"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>

                </a>
                <a
                  key="Exit"
                  href="#"
                  className='text-gray-700 hover:text-gray-900 hover:bg-gray-50 group flex items-center pl-2 py-2 text-sm font-medium rounded-md'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classNames(
                    true ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>

                </a>
              </div>
            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className="lg:pl-28 flex flex-col" style={{ margin: '15px' }}>
          {/* Search header */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Búsqueda
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Búsqueda"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              View profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Notifications
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Get desktop app
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Support
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" style={{ background: '#99CF16', borderRadius: '7px' }}>
              <div className="flex-1 min-w-0 flex gap-3 text-white">
                {/* <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Inicio</h1> */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>


              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4 text-white gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <img width={"22px"} src="https://cdn-icons-png.flaticon.com/512/939/939640.png" alt="" />
                  <h5 className='font-bold'>Español</h5>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>

                <button type="button" className="inline-flex relative items-center p-1 text-sm font-medium text-center text-white focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className="sr-only">Notifications</span>
                  <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white rounded-full" style={{ background: "#00BABA" }}>8</div>
                </button>

                <button type="button" className="inline-flex relative items-center p-1 text-sm font-medium text-center text-white focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                  <span className="sr-only">Notifications</span>
                  <div className="inline-flex absolute -top-2 -right-2 justify-center items-center w-5 h-5 text-xs font-bold text-white rounded-full" style={{ background: "#B50938" }}>4</div>
                </button>

                <div className="flex flex-col items-end mx-2">
                  <h4 className='font-bold'>John Doe</h4>
                  <h6 className='font-regular'>Admin</h6>
                </div>

                <div className="relative">
                  <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" />
                  <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>

              </div>
            </div>

            <div className="mt-10 sm:mt-10">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                  <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="flex justify-between">
                        <h1 className='font-semibold text-2xl mb-5'>Filtros de Búsqueda</h1>
                        <button type="button" style={{ color: '#99CF16', borderColor: '#99CF16' }} className="bg-white border focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-2">
                          <img width={'13px'} src={broom} />
                          Limpiar Filtros
                        </button>
                      </div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre
                          </label>
                          <input type="text" id="email" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nombre de Usuario" required />
                          {/* <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          /> */}
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                            Correo Electrónico
                          </label>
                          <input type="email" id="email" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Correo Electrónico" required />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Perfil
                          </label>
                          <select
                            id="profile" defaultValue={"Desarrollador"}
                            name="profile" placeholder='Perfil'
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            {
                              APIData.map(element => {
                                return (
                                  <option key={element.id}>{element.name}</option>
                                )
                              })
                            }
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Estado
                          </label>
                          <select
                            id="profile"
                            name="profile" placeholder='Perfil'
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                          </select>
                        </div>

                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-10 sm:mt-10">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md sm:rounded-md">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center mt-6 mb-3">
                      <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Usuarios</h1>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex">

                        <Modal title="Agregar Usuario" data={APIData} />
                        <button type="button" style={{ color: '#99CF16', borderColor: '#99CF16' }} className="bg-white border focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                          Exportar
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>

                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="sm:flex sm:items-center mt-6 mb-3">
                      <div className="sm:flex-auto flex items-center gap-2">
                        <h3 className=" font-regular text-gray-900">Ver</h3>
                        <select
                          id="location"
                          name="location"
                          className="block pl-3 text-base rounded-lg font-medium focus:outline-none"
                          defaultValue="10"
                        >
                          <option>10</option>
                          <option>20</option>
                          <option>30</option>
                        </select>
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex">
                        <div className='flex gap-3 items-center'>
                          <label className='font-regular' htmlFor="busqueda">
                            Buscar
                          </label>
                          <input
                            type="text"
                            name="busqueda"
                            id="busqueda"
                            className="block p-2 w-full sm:text-sm border border-gray-200 rounded-lg shadow-md"
                            placeholder="Buscar"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 mb-8">
                          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                              {
                                users.length === 0 ?
                                  usersCount() :
                                  <>
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th scope="col" className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                          #
                                        </th>
                                        <th scope="col" className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                          Nombre
                                        </th>
                                        <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                          Correo <br /> Electrónico
                                        </th>
                                        <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                          Perfil
                                        </th>
                                        <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                          Estado
                                        </th>
                                        <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                          Fecha <br /> Modificación
                                        </th>
                                        <th scope="col" className="px-3 py-2 text-left text-sm font-semibold text-gray-900">
                                          Acciones
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                      {users &&
                                      users !== null &&
                                      users !== undefined &&
                                  users.map(((data, i) => (
                                      <tr unique={data.id} key={data.id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-6">{data.id}</td>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                          <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                              <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                                                <svg className="absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                              </div>
                                            </div>
                                            <div className="ml-4">
                                              <div className="font-medium text-gray-900">{data.name}</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                                          <div className="text-gray-500">{data.email}</div>
                                        </td>
                                        <Profile data={data} />
                                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
                                          {
                                            data.state === 1 ?
                                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                Activo
                                              </span> :
                                              <span className="inline-flex rounded-full bg-gray-600 px-2 text-xs font-semibold leading-5 text-white">
                                                Inactivo
                                              </span>
                                          }
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">{data.updated_at}</td>
                                        <td className="relative whitespace-nowrap py-4 text-center text-sm font-medium sm:pr-8">
                                          <Popover>
                                            <PopoverHandler>
                                              <Button variant="text">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                </svg>

                                              </Button>
                                            </PopoverHandler>
                                            <PopoverContent className='flex flex-col items-start'>
                                              <>

                                                <button type="button" className="text-black border focus:outline-none hover:bg-main-light hover:text-main-default hover:font-bold w-full font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-2" onClick={() => { selectUser(i); setShowModal(true) }}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                  </svg>
                                                  Ver
                                                </button>

                                                {showModal ? (
                                                  <>
                                                    <div
                                                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                    >
                                                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        {/*content*/}
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                          {/*header*/}
                                                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold">
                                                              Ver Usuario
                                                            </h3>
                                                            <button
                                                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                              onClick={() => setShowModal(false)}
                                                            >
                                                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                ×
                                                              </span>
                                                            </button>
                                                          </div>
                                                          {/*body*/}
                                                          <div className="relative p-6 flex-auto">
                                                            <form>
                                                              <div className="-space-y-px rounded-md shadow-sm">
                                                                <div>
                                                                  <label className="sr-only">
                                                                    Nombre
                                                                  </label>
                                                                  <input
                                                                    id="nombre"
                                                                    name="nombre" disabled
                                                                    type="nombre" value={name}
                                                                    required onChange={e => setName(e.target.value)}
                                                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    placeholder="Nombre"
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <label className="sr-only">
                                                                    Correo Electrónico
                                                                  </label>
                                                                  <input
                                                                    id="email"
                                                                    name="email" disabled
                                                                    type="email" value={email}
                                                                    required
                                                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    placeholder="Correo Electrónico"
                                                                  />
                                                                </div>
                                                              </div>
                                                              <div className="mt-2">
                                                                <label className="mt-2">Perfil</label>
                                                                <input
                                                                  id="email"
                                                                  name="profile" disabled
                                                                  type="email"
                                                                  required placeholder={
                                                                    profile === 1 ? 'Practicante' :
                                                                      profile === 2 ? 'Desarrollador' :
                                                                        profile === 3 ? 'Vendedor' :
                                                                          profile === 4 ? 'Administrador' : ''
                                                                  }
                                                                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                />
                                                              </div>
                                                              <div className="mt-2">
                                                                <label className="mt-2">Estado</label>
                                                                <select
                                                                  id="state" disabled
                                                                  name="state" onChange={e => { setState(e.target.value) }}
                                                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                >{
                                                                    state === 1 ?
                                                                      <>
                                                                        <option defaultValue={1} value={1}>Activo</option>
                                                                        <option value={0}>Inactivo</option>
                                                                      </>
                                                                      :
                                                                      <>
                                                                        <option value={1}>Activo</option>
                                                                        <option selected value={0}>Inactivo</option>
                                                                      </>
                                                                  }
                                                                </select>
                                                              </div>
                                                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                <button
                                                                  className="bg-white text-main-default active:bg-green-600 border border-main-default font-semibold text-sm px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                  type="button"
                                                                  onClick={() => setShowModal(false)}
                                                                >
                                                                  Cancelar
                                                                </button>
                                                              </div>
                                                            </form>
                                                          </div>
                                                          {/*footer*/}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                  </>
                                                ) : null}
                                              </>
                                              <>

                                                <button type="button" className="text-black border focus:outline-none hover:bg-main-light hover:text-main-default hover:font-bold w-full font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-2" onClick={() => { setShowModal2(true) }}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                  </svg>
                                                  Editar
                                                </button>

                                                {showModal2 ? (
                                                  <>
                                                    <div
                                                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                    >
                                                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        {/*content*/}
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                          {/*header*/}
                                                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                            <h3 className="text-3xl font-semibold">
                                                              Editar Usuario
                                                            </h3>
                                                            <button
                                                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                              onClick={() => setShowModal2(false)}
                                                            >
                                                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                ×
                                                              </span>
                                                            </button>
                                                          </div>
                                                          {/*body*/}
                                                          <div className="relative p-6 flex-auto">
                                                            <form>
                                                              <div className="-space-y-px rounded-md shadow-sm">
                                                                <div>
                                                                  <label className="sr-only">
                                                                    Nombre
                                                                  </label>
                                                                  <input
                                                                    id="nombre"
                                                                    name="nombre"
                                                                    type="nombre" value={name}
                                                                    required onChange={e => setName(e.target.value)}
                                                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    placeholder="Nombre"
                                                                  />
                                                                </div>
                                                                <div>
                                                                  <label className="sr-only">
                                                                    Correo Electrónico
                                                                  </label>
                                                                  <input
                                                                    id="email"
                                                                    name="email"
                                                                    type="email" value={email}
                                                                    required onChange={e => setEmail(e.target.value)}
                                                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    placeholder="Correo Electrónico"
                                                                  />
                                                                </div>
                                                              </div>
                                                              <div className="mt-2">
                                                                <label className="mt-2">Perfil</label>
                                                                {
                                                                  profile === 1 ?
                                                                    <select
                                                                      id="profile"
                                                                      name="profile" defaultValue={1} onChange={e => {
                                                                        switch (e.target.value) {
                                                                          case "practicante":
                                                                            setProfile(1);
                                                                            break;
                                                                          case "Desarrollador":
                                                                            setProfile(2);
                                                                            break;
                                                                          case "Vendedor":
                                                                            setProfile(3);
                                                                            break;
                                                                          case "Administrador":
                                                                            setProfile(4);
                                                                            break;
                                                                          default:
                                                                            break;
                                                                        }
                                                                      }}
                                                                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                    >
                                                                      <option value={1}>Practicante</option>
                                                                      <option>Desarrollador</option>
                                                                      <option>Vendedor</option>
                                                                      <option>Administrador</option>
                                                                    </select>
                                                                    :
                                                                    profile === 2 ?
                                                                      <select
                                                                        id="profile"
                                                                        name="profile" defaultValue={2} onChange={e => {
                                                                          switch (e.target.value) {
                                                                            case "practicante":
                                                                              setProfile(1);
                                                                              break;
                                                                            case "Desarrollador":
                                                                              setProfile(2);
                                                                              break;
                                                                            case "Vendedor":
                                                                              setProfile(3);
                                                                              break;
                                                                            case "Administrador":
                                                                              setProfile(4);
                                                                              break;
                                                                            default:
                                                                              break;
                                                                          }
                                                                        }}
                                                                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                      >
                                                                        <option>Practicante</option>
                                                                        <option value={2}>Desarrollador</option>
                                                                        <option>Vendedor</option>
                                                                        <option>Administrador</option>
                                                                      </select>
                                                                      :
                                                                      profile === 3 ?
                                                                        <select
                                                                          id="profile"
                                                                          name="profile" defaultValue={3} onChange={e => {
                                                                            switch (e.target.value) {
                                                                              case "practicante":
                                                                                setProfile(1);
                                                                                break;
                                                                              case "Desarrollador":
                                                                                setProfile(2);
                                                                                break;
                                                                              case "Vendedor":
                                                                                setProfile(3);
                                                                                break;
                                                                              case "Administrador":
                                                                                setProfile(4);
                                                                                break;
                                                                              default:
                                                                                break;
                                                                            }
                                                                          }}
                                                                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                        >
                                                                          <option>Practicante</option>
                                                                          <option>Desarrollador</option>
                                                                          <option value={3}>Vendedor</option>
                                                                          <option>Administrador</option>
                                                                        </select>
                                                                        :
                                                                        profile === 4 ?
                                                                          <select
                                                                            id="profile"
                                                                            name="profile" defaultValue={4} onChange={e => {
                                                                              switch (e.target.value) {
                                                                                case "practicante":
                                                                                  setProfile(1);
                                                                                  break;
                                                                                case "Desarrollador":
                                                                                  setProfile(2);
                                                                                  break;
                                                                                case "Vendedor":
                                                                                  setProfile(3);
                                                                                  break;
                                                                                case "Administrador":
                                                                                  setProfile(4);
                                                                                  break;
                                                                                default:
                                                                                  break;
                                                                              }
                                                                            }}
                                                                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                          >
                                                                            <option>Practicante</option>
                                                                            <option>Desarrollador</option>
                                                                            <option>Vendedor</option>
                                                                            <option value={4}>Administrador</option>
                                                                          </select>
                                                                          : ''
                                                                }
                                                              </div>
                                                              <div className="mt-2">
                                                                <label className="mt-2">Estado</label>
                                                                <select
                                                                  id="state"
                                                                  name="state" defaultChecked={state} onChange={e => { setState(e.target.value) }}
                                                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                                >
                                                                  {
                                                                    state === 1 ?
                                                                      <>
                                                                        <option value={1}>Activo</option>
                                                                        <option value={0}>Inactivo</option>
                                                                      </>
                                                                      :
                                                                      <>
                                                                        <option value={1}>Activo</option>
                                                                        <option value={0}>Inactivo</option>
                                                                      </>
                                                                  }
                                                                </select>
                                                              </div>
                                                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                                                                <button
                                                                  className="bg-main-default text-white active:bg-emerald-600 font-semibold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                  type="submit"
                                                                  onClick={updateUser}
                                                                >
                                                                  Editar
                                                                </button>
                                                                <button
                                                                  className="bg-white text-main-default active:bg-green-600 border border-main-default font-semibold text-sm px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                  type="button"
                                                                  onClick={() => setShowModal2(false)}
                                                                >
                                                                  Cancelar
                                                                </button>
                                                              </div>
                                                            </form>
                                                          </div>
                                                          {/*footer*/}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                                  </>
                                                ) : null}
                                              </>
                                              <button type="button" className="text-black border focus:outline-none hover:bg-main-light hover:text-main-default hover:font-bold w-full font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-2" onClick={() => deleteUser(data.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>

                                                Eliminar
                                              </button>
                                            </PopoverContent>
                                          </Popover>
                                        </td>
                                      </tr>
                                      )))}
                                      </tbody> 
                                  </>
                              }
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  )
}