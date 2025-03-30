import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaReceipt, FaImage, FaInfoCircle, FaClock, FaCheckCircle, FaTimesCircle, FaFilter, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllClaims = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: claims = [], isLoading, refetch } = useQuery({
        queryKey: ['claims', statusFilter],
        queryFn: async () => {
            const res = await axiosPublic.get(`/claims`);
            return res.data;
        }
    });
    const filteredClaims = statusFilter === 'all'
        ? claims
        : claims.filter(claim => claim.status === statusFilter);


    const handleStatusUpdate = async (claimId, newStatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to change this claim's status to ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1a237e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosPublic.patch(`/claims/${claimId}/status`, { status: newStatus });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire(
                            'Updated!',
                            `Claim status has been set to ${newStatus}.`,
                            'success'
                        );
                        refetch();
                    }
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'There was an error updating the status.',
                        'error'
                    );
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">All Claims</h1>
                <div className="flex items-center gap-2">
                    <FaFilter className="text-gray-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="select select-bordered select-sm"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {filteredClaims.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <h2 className="text-xl font-medium mb-4">No claims found</h2>
                    {statusFilter !== 'all' && (
                        <button
                            onClick={() => setStatusFilter('all')}
                            className="btn btn-sm btn-outline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th>Claim Info</th>
                                    <th>Evidence</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>Chat(Climant)</th> 
                                    <th>Chat(Who Got)</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClaims.map((claim) => (
                                    <tr key={claim._id} className="hover:bg-gray-50">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                {claim.imageUrl ? (
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={claim.imageUrl} alt="Claimed item" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="avatar placeholder">
                                                        <div className="bg-neutral text-neutral-content mask mask-squircle w-12 h-12">
                                                            <span className="text-xl">?</span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold">Claim #{claim._id.slice(-6)}</div>
                                                    <div className="text-sm opacity-50">
                                                        {new Date(claim.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-sm mt-1">
                                                        Claimant: {claim.claimantName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1">
                                                    <FaReceipt className="text-blue-500" />
                                                    <span className="text-sm">{claim.receiptUrl ? 'Receipt provided' : 'No receipt'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FaImage className="text-green-500" />
                                                    <span className="text-sm">{claim.imageUrl ? 'Images provided' : 'No images'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={claim.status}
                                                onChange={(e) => handleStatusUpdate(claim._id, e.target.value)}
                                                className={`select select-bordered select-sm ${claim.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : claim.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="verified">Verified</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/claim-details/${claim._id}`}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                Review
                                            </Link>
                                        </td>
                                        <td>
                                            {claim.status === 'verified' ? (
                                                <Link
                                                    to={`/chats/${claim?.claimantEmail}`}
                                                    className="btn btn-outline  w-32 btn-sm flex items-center gap-1"
                                                >
                                                    <FaComments className="text-blue-500" /> Chat
                                                </Link>
                                            ) : (
                                                <button
                                                    className="btn btn-disabled w-32 btn-sm flex items-center gap-1 cursor-not-allowed"
                                                    title="Chat unavailable until verified"
                                                >
                                                    <FaTimesCircle className="text-red-500" /> Cannot Chat
                                                </button>
                                            )}
                                        </td>
                                        
                                        <td>
                                            {claim.status === 'verified' ? (
                                                <Link
                                                    to={`/chats/${claim?.postAuthor}`}
                                                    className="btn btn-outline  w-32 btn-sm flex items-center gap-1"
                                                >
                                                    <FaComments className="text-blue-500" /> Chat
                                                </Link>
                                            ) : (
                                                <button
                                                    className="btn btn-disabled w-32 btn-sm flex items-center gap-1 cursor-not-allowed"
                                                    title="Chat unavailable until verified"
                                                >
                                                    <FaTimesCircle className="text-red-500" /> Cannot Chat
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllClaims;
