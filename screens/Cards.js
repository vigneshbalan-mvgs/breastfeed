import * as React from "react";
import { useState } from "react";

import {
  View,
  Card,
  Avatar,
  IconButton,
  Button,
  Text,
} from "react-native-paper";

const Cards = () => {
  const [likeCount, setLikeCount] = useState(0);

  const handleLikePress = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <Card style={{ margin: 10, marginTop: 20, padding: 0 }}>
      <Card.Content>
        <Card.Title
          title="Vignesh Mvgs"
          subtitle="Paramakudi, Tamil Nadu, India"
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="account"
              size={47}
              style={{ backgroundColor: "#2E073F" }}
            />
          )}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Text variant="titleLarge" style={{ marginVertical: 10 }}>
          Today
        </Text>
        <Text variant="bodyMedium">
          Card content describing this post goes here. It can be a description,
          a caption, or anything that goes with the post image.
        </Text>
        <Card.Actions
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <IconButton
            icon="heart"
            style={{ marginRight: 10, color: "red" }}
            onPress={handleLikePress}
          />
          <Text style={{ marginRight: 20, fontWeight: "bold", fontSize: 20 }}>
            {likeCount} Likes
          </Text>
          <IconButton
            icon="comment"
            style={{ marginRight: 10 }}
            onPress={() => {}}
          />
          <IconButton icon="share" onPress={() => {}} />
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};
export default Cards;
