import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic'; 
import { FaReceipt, FaImage, FaInfoCircle, FaClock, FaCheckCircle, FaTimesCircle, FaTrash, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2'; 

const MyClaims = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic(); 
    const queryClient = useQueryClient();

    const { data: claims = [], isLoading, refetch } = useQuery({
        queryKey: ['claims', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/claims/user/${user?.email}`);
            return res.data;
        }
    });
 
    const { mutate: deleteClaim } = useMutation({
        mutationFn: (id) => axiosPublic.delete(`/claims/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['claims', user?.email]);
            Swal.fire({
                icon: 'success',
                title: 'Claim Deleted',
                text: 'Your claim has been successfully deleted',
                showConfirmButton: false,
                timer: 2000
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to delete claim',
            });
        }
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="badge badge-warning gap-1"><FaClock /> Pending</span>;
            case 'verified':
                return <span className="badge badge-success gap-1"><FaCheckCircle /> Verified</span>;
            case 'rejected':
                return <span className="badge badge-error gap-1"><FaTimesCircle /> Rejected</span>;
            default:
                return <span className="badge badge-info gap-1">Unknown</span>;
        }
    };

    const handleDelete = async (claimId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the claim and its image!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) { 
                deleteClaim(claimId);
                refetch();
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-center">My Claims</h1>
            
            {claims.length === 0 ? (
                <div className="text-center py-12">
                    <h2 className="text-xl font-medium mb-4">You haven't made any claims yet</h2>
                    <Link to="/lost-found" className="btn btn-primary">
                        Browse Lost & Found Items
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Claim Details</th>
                                <th>Status</th>
                                <th>Chat</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map((claim) => (
                                <tr key={claim._id}>
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
                                                <div className="text-sm opacity-50">{new Date(claim.createdAt).toLocaleDateString()}</div>
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
                                            <div className="flex items-center gap-1">
                                                <FaInfoCircle className="text-purple-500" />
                                                <span className="text-sm">{claim.details.substring(0, 30)}...</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(claim.status)}</td>

                                    {/* Chat Column */}
                                    <td>
                                        {claim.status === 'verified' ? (
                                            <Link to={`/chat/${claim._id}`} title="Chat with item owner">
                                                <FaComments className="text-green-500 text-xl cursor-pointer" />
                                            </Link>
                                        ) : (
                                            <FaTimesCircle className="text-gray-400 text-xl" title="Cannot chat unless verified" />
                                        )}
                                    </td>

                                    <td>
                                        <div className="flex gap-2">
                                            <Link 
                                                to={`/claim-details/${claim._id}`} 
                                                className="btn btn-ghost btn-sm outline"
                                            >
                                                Details
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(claim._id)}
                                                className="btn btn-ghost btn-sm text-red-500 cursor-pointer"
                                                disabled={claim.status === 'verified'}
                                                title={claim.status === 'verified' ? "Verified claims cannot be deleted" : "Delete claim"}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyClaims;
