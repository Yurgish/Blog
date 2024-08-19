import { useState } from "react";
import { useAppSelector } from "@hooks/store.hooks";
import useIsSpecificRoute from "@hooks/useIsSpecificRoute";
import AlertModal from "@components/ui/AlertModal";
import Button from "@components/ui/Button";
import { postsApi } from "@/services/posts.service";
import Input from "@components/ui/Input";

const ModeratedPostAdminControls = ({ postId }: { postId: string }) => {
    const { isAdmin } = useAppSelector((state) => state.userReducer);
    const isSpecificRoute = useIsSpecificRoute("/admin-panel");

    const [confirmPostTrigger] = postsApi.useConfirmPostMutation();
    const [refusePostTrigger] = postsApi.useRefusePostMutation();

    const [isConfirmAlertVisible, setIsConfirmAlertVisible] = useState(false);
    const [isRefuseAlertVisible, setIsRefuseAlertVisible] = useState(false);
    const [adminMessage, setAdminMessage] = useState("");
    const handlePostConfirm = async () => {
        try {
            const message = await confirmPostTrigger(postId);
            console.log(message);
        } catch (error) {
            console.log(error);
        }
    };
    const handlePostRefuse = async () => {
        try {
            const message = await refusePostTrigger({ postId, message: adminMessage });
            console.log(message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        isAdmin &&
        isSpecificRoute && (
            <>
                <div className="flex flex-col gap-2 max-w">
                    <Button size="small" onClick={() => setIsConfirmAlertVisible(true)}>
                        Confirm
                    </Button>
                    <Button size="small" variant="deny" onClick={() => setIsRefuseAlertVisible(true)}>
                        Refuse
                    </Button>
                </div>
                <AlertModal
                    isVisible={isConfirmAlertVisible}
                    onClose={() => setIsConfirmAlertVisible(false)}
                    onConfirm={handlePostConfirm}
                    alertText="Are you sure you want to confirm this post?"
                />
                <AlertModal
                    isVisible={isRefuseAlertVisible}
                    onClose={() => setIsRefuseAlertVisible(false)}
                    onConfirm={handlePostRefuse}
                    alertText="Are you sure you want to refuse with publication of this post?"
                    confirmText="Refuse"
                    modalClassName="max-w-[500px]"
                >
                    <Input
                        value={adminMessage}
                        onChange={(e) => setAdminMessage(e.target.value)}
                        type="text"
                        placeholder="Why you declining this post?"
                        className="mb-2"
                    />
                </AlertModal>
            </>
        )
    );
};

export default ModeratedPostAdminControls;
