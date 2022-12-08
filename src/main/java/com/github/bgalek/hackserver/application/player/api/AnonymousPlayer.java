package com.github.bgalek.hackserver.application.player.api;

import com.google.common.base.Preconditions;

import java.net.InetSocketAddress;

public sealed class AnonymousPlayer permits RegisteredPlayer {
    private final String name;
    private final InetSocketAddress inetSocketAddress;

    public AnonymousPlayer(String name, InetSocketAddress inetSocketAddress) {
        Preconditions.checkNotNull(name);
        Preconditions.checkNotNull(inetSocketAddress);
        this.name = name;
        this.inetSocketAddress = inetSocketAddress;
    }

    public String getName() {
        return name;
    }

    public InetSocketAddress getInetSocketAddress() {
        return inetSocketAddress;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AnonymousPlayer that)) return false;

        if (!name.equals(that.name)) return false;
        return inetSocketAddress.equals(that.inetSocketAddress);
    }

    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result + inetSocketAddress.hashCode();
        return result;
    }
}
