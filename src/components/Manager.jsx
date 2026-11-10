import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = "passwords";

const Manager = () => {
    // Load saved passwords on first render
    const [showPassword, setshowPassword] = useState(false)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const inputBase =
        "w-full rounded-full border border-green-500 bg-white px-4 py-1.5 text-sm text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-300";

    const deletePassword = (id) => {
        let c = confirm("Are you sure to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const savePass = () => {
        console.log(passwordArray)
        if ((form.site && form.username && form.password) === "") {
            alert("Nothing saved")
        }
        else {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied Text', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    // saving personal pass into the localstorage
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])



    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="mx-auto max-w-5xl px-4 pb-12">
                {/* Heading */}
                <div className="pt-14 text-center">
                    <h1 className="text-4xl font-bold">
                        <span className="text-green-500">&lt;</span>
                        Pass
                        <span className="text-green-500">OP/&gt;</span>
                    </h1>
                    <p className="text-green-900">Your own Password Manager</p>
                </div>

                {/* Form */}
                <div className="flex flex-col items-center gap-6 pt-4 text-black">
                    <input
                        name="site"
                        value={form.site}
                        type="text"
                        placeholder="Enter website URL"
                        className={inputBase}
                        onChange={handleChange}
                    />

                    <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
                        <input
                            name="username"
                            value={form.username}
                            type="text"
                            placeholder="Enter Username"
                            className={`${inputBase} md:flex-1`}
                            onChange={handleChange}
                        />

                        <div className="relative md:w-56">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                placeholder="Enter Password"
                                className="w-full rounded-full border border-black bg-white py-1.5 pl-4 pr-10 text-sm text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-300"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setshowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            >
                                <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                            </button>
                        </div>
                    </div>

                    <button
                        className="flex items-center gap-2 rounded-full border border-green-900 bg-green-400 px-8 py-2 text-sm font-medium hover:bg-green-300"
                        onClick={savePass}>
                        <i className="fa-solid fa-table-cells-large text-lg" />
                        Save Password
                    </button>
                </div>

                {/* Showing password container */}
                <div className="pt-10">
                    <h2 className="pb-3 text-xl font-bold">Your Passwords</h2>
                    <div className="overflow-x-auto rounded-md">
                        <table className="w-full overflow-hidden rounded-md text-left text-sm">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="px-4 py-2">Site</th>
                                    <th className="px-4 py-2">Username</th>
                                    <th className="px-4 py-2">Password</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="border-b border-white">
                                        <td className="px-4 py-2">
                                            <a href={item.site} target="_blank" rel="noreferrer" className="underline">
                                                {item.site}
                                            </a>
                                            <i
                                                onClick={() => copyText(item.site)}
                                                className="fa-regular fa-copy ml-2 cursor-pointer"
                                                title="Copy"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.username}
                                            <i
                                                onClick={() => copyText(item.username)}
                                                className="fa-regular fa-copy ml-2 cursor-pointer"
                                                title="Copy"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            {"•".repeat(item.password.length)}
                                        </td>
                                        <td className="px-4 py-2">
                                            <i className="fa-solid fa-pencil cursor-pointer mx-4"
                                                onClick={() => editPassword(item.id)}></i>
                                            <i
                                                className="fa-solid fa-trash cursor-pointer text-red-600"
                                                title="Delete"
                                                onClick={() => deletePassword(item.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Manager;