import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import Dropzone from "react-dropzone";
import { setPosts } from "../../state";

const MyPostWidget = ({ picturePath }) => {
    const [isClickImage, setClickImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobile = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.main;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);  // 这里的 post 是用户手动输入或生成的描述
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
    
        const response = await fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
    
        const posts = await response.json();
        dispatch(setPosts({ posts: posts }));
        setPost("");
        setImage(null);
    };

    const handleGenerateDescription = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("picture", image);
    
            const response = await fetch("http://localhost:3001/posts/generate-description", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            const data = await response.json();
            if (response.ok) {
                setPost(data.description);
            } else {
                console.error("Failed to generate description:", data.message);
            }
        } else {
            console.error("No image selected.");
        }
    };
    

    return (
        <WidgetWrapper>
            <FlexBetween gap="0.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind?"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    sx={{
                        width: "100%",
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        backgroundColor: palette.neutral.light
                    }}
                />
            </FlexBetween>
            {isClickImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                   <Dropzone
                        accept="image/*"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{
                                        "&:hover": {
                                            cursor: "pointer"
                                        }
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "25%" }}>
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>

                    {image && (
                        <Button
                            onClick={handleGenerateDescription}
                            sx={{
                                marginTop: "1rem",
                                color: palette.background.alt,
                                backgroundColor: palette.primary.main,
                                borderRadius: "3rem",
                            }}>
                            Generate Description
                        </Button>
                    )}
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0 " }} />

            <FlexBetween>
                <FlexBetween
                    gap="0.25rem"
                    onClick={() => setClickImage(!isClickImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                                color: medium
                            }
                        }}>
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobile ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Clip
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Attachment
                            </Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
                                Audio
                            </Typography>
                        </FlexBetween>
                    </>
                ) : (<FlexBetween gap={"0.25rem"}>
                    <MoreHorizOutlined sx={{ color: mediumMain }} />
                </FlexBetween>
                )
                }

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}>
                    Post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget;
