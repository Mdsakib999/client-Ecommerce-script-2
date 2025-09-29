import { useState, useRef, useEffect } from "react";
import { Upload, X, ImageIcon, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  useAddOfferMutation,
  useUpdateOfferMutation,
  useGetAllOffersQuery,
  useDeleteOffersMutation,
} from "../../../redux/app/services/offer/offerApi";

export default function AddOffer() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const { data: offersData } = useGetAllOffersQuery();
  const [addOffer, { isLoading: adding }] = useAddOfferMutation();
  const [updateOffer, { isLoading: updating }] = useUpdateOfferMutation();
  const [deleteOffers, { isLoading: deleting }] = useDeleteOffersMutation();

  // Load existing offer images on mount
  useEffect(() => {
    const offer = offersData?.data?.[0];
    if (offer?.images) {
      setImages(
        offer.images.map((img, idx) => ({
          id: img.public_id || img.url || idx,
          url: img.url,
          name: img.public_id?.split("/").pop() || `offer${idx + 1}.jpg`,
          preview: img.url,
          isExisting: true,
        }))
      );
    }
  }, [offersData]);

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > 4) {
      toast.error("Maximum 4 images allowed", {
        className: "font-serif text-center",
      });
      event.target.value = "";
      return;
    }
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file,
              preview: e.target?.result,
              name: file.name,
              isExisting: false,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = "";
  };

  // Remove image
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Upload images (add or update)
  const handleUpload = async () => {
    if (images.length === 0) {
      toast.error("Please select at least one image", {
        className: "font-serif text-center",
      });
      return;
    }

    const formData = new FormData();
    const newFiles = images.filter((img) => img.file);
    const keepPublicIds = images
      .filter((img) => !img.file)
      .map((img) => img.id);

    // Append new files
    newFiles.forEach((img) => formData.append("images", img.file, img.name));

    // Append existing URLs once
    if (keepPublicIds.length) {
      formData.append("keepPublicIds", JSON.stringify(keepPublicIds));
    }

    try {
      if (offersData?.data?.[0]?._id) {
        await updateOffer({
          offerId: offersData.data[0]._id,
          images: formData,
        }).unwrap();
        toast.success("Offer updated successfully!", {
          className: "font-serif text-center",
        });
      } else {
        await addOffer(formData).unwrap();
        toast.success("Offer added successfully!", {
          className: "font-serif text-center",
        });
      }
    } catch {
      toast.error("Upload failed", { className: "font-serif text-center" });
    }
  };

  // Delete all offers
  const handleDeleteAll = async () => {
    if (!offersData?.data?.[0]?._id) return;
    try {
      await deleteOffers(offersData.data[0]._id).unwrap();
      setImages([]);
      toast.success("All offers deleted.", {
        className: "font-serif text-center",
      });
    } catch {
      toast.error("Failed to delete offers.", {
        className: "font-serif text-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6 mt-20 md:mt-10 lg:mt-0 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col justify-center items-center p-8 mb-8">
          <h1 className="text-center text-xl md:text-3xl lg:text-4xl font-black text-gray-800 mb-4 flex items-center gap-x-2">
            <div className="hidden md:block p-2 bg-gradient-to-tl from-emerald-500 to-green-200 rounded-xl">
              <Plus className="w-8 h-8 text-white" />
            </div>
            Add Promotional Offers
          </h1>
          <p className="text-gray-600 text-sm">
            Upload 1-4 images to create stunning promotional offers.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              Click to upload images
            </p>
            <p className="text-gray-500">
              PNG, JPG, JPEG up to 5MB each (Max 4 images)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Selected Images */}
          {images.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="relative">
                  <img
                    src={img.preview}
                    alt={img.name}
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                  />
                  <button
                    onClick={() => removeImage(img.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleUpload}
              disabled={adding || updating || images.length === 0}
              className="w-full bg-yellow-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-yellow-600 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Save Images {images.length > 0 && `(${images.length})`}
            </button>
            <button
              onClick={handleDeleteAll}
              disabled={deleting || images.length === 0}
              className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete All Offers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
