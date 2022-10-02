import React from 'react'

function Profile({ data }) {

    let usuario;

    switch (data.profile) {
        case 1:
            usuario = "Practicante"
            break;
        case 2:
            usuario = "Desarrollador"
            break;
        case 3:
            usuario = "Vendedor"
            break;
        case 4:
            usuario = "Administrador"
            break;

        default:
            break;
    }

    return (
        <td className="whitespace-nowrap px-2 py-4 text-sm text-gray-500">
            <div className="text-gray-900">{usuario}</div>
        </td>
    )
}

export default Profile